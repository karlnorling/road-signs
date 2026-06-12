/**
 * create-assets.ts
 *
 * Downloads road sign SVGs from Wikimedia Commons, converts them to raster
 * formats (PNG, JPG, WebP) at multiple sizes, and generates per-country
 * SVG sprite + CSS sprite as dist artifacts in the country package.
 *
 * Throttled to be polite to Wikimedia servers.
 */

/* oxlint-disable no-await-in-loop */

import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';
import { globSync } from 'glob';
import { optimize } from 'svgo';
import sharp from 'sharp';

/**
 * Scraper-agnostic input: a category → sign-list map. Each country scraper
 * narrows the category union further (USCategory, ViennaCategory, etc.) and
 * passes its instance in via `update.ts`; this signature is the lowest common
 * denominator. (Replaces the previous `ScrapedData from './scrape-us'` import
 * which only typed the US categories.)
 */
type GenericScrapedData = Record<string, Array<{ code: string; imageUrl: string | null }>>;

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

const IMAGE_SIZES = [240, 512, 768, 1024, 2048] as const;

export const sanitize = (str: string): string =>
  str
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Polite delay between every outbound request (applied inside the worker). */
const REQUEST_DELAY_MS = 600;

/** How many sign downloads run in parallel. */
const CONCURRENCY = 4;

/**
 * Parse a Retry-After header in either seconds (`"120"`) or HTTP-date
 * (`"Wed, 21 Oct 2026 07:28:00 GMT"`) form. Returns milliseconds to wait,
 * or null if the header is missing/unparseable.
 */
const parseRetryAfter = (header: string | null): number | null => {
  if (!header) return null;
  const trimmed = header.trim();
  if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10) * 1000;
  const t = Date.parse(trimmed);
  if (!Number.isNaN(t)) return Math.max(0, t - Date.now());
  return null;
};

const fetchWithRetry = async (url: string, retries = 6, baseDelayMs = 5000): Promise<Response> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.ok) return res;
    if ((res.status === 429 || res.status >= 500) && attempt < retries) {
      // Respect Retry-After (seconds or HTTP-date) if present, otherwise exponential back-off.
      const fromHeader = parseRetryAfter(res.headers.get('retry-after'));
      const wait = fromHeader ?? baseDelayMs * 2 ** (attempt - 1);
      console.warn(`  ${res.status} on ${url} — retrying in ${Math.round(wait / 1000)}s`);
      await sleep(wait);
      continue;
    }
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  throw new Error(`All retries exhausted for ${url}`);
};

/**
 * Run `fn` over `items` with at most `concurrency` tasks in flight at once.
 * Each worker also inserts a polite delay between its own requests.
 */
const withConcurrency = async <T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>,
): Promise<void> => {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await fn(item);
      if (queue.length > 0) await sleep(REQUEST_DELAY_MS);
    }
  });
  await Promise.all(workers);
};

const resolveWikimediaDirectUrl = async (filePageUrl: string): Promise<string | undefined> => {
  try {
    const res = await fetchWithRetry(filePageUrl);
    const html = await res.text();
    const doc = parse(html);
    const href = doc.querySelector('.fullImageLink a')?.getAttribute('href');
    if (!href) return undefined;
    // Wikipedia uses protocol-relative //upload... ; Commons uses full https://upload...
    return href.startsWith('http') ? href : `https:${href}`;
  } catch (err) {
    console.error(`  Error resolving image page ${filePageUrl}:`, (err as Error).message);
    return undefined;
  }
};

const downloadSvg = async (dest: string, url: string): Promise<void> => {
  try {
    const res = await fetchWithRetry(url);
    const ct = res.headers.get('content-type') ?? '';
    // Wikimedia occasionally serves a PNG for an .svg page URL — skip it.
    if (ct.includes('image/png') || ct.includes('image/jpeg')) {
      console.warn(`  Skipping non-SVG content-type "${ct}" for ${path.basename(dest)}`);
      return;
    }
    const content = await res.text();
    if (!content.trimStart().startsWith('<')) {
      console.warn(`  Skipping non-SVG content for ${path.basename(dest)}`);
      return;
    }
    await fs.promises.writeFile(dest, content);
    console.log(`  Downloaded: ${path.basename(dest)}`);
  } catch (err) {
    console.error(`  Error downloading ${url}:`, (err as Error).message);
  }
};

/**
 * Normalises an SVG with SVGO then stamps explicit width/height so librsvg
 * renders onto a known-size canvas. Without explicit dimensions librsvg uses
 * the raw viewBox units as pixels — some Wikimedia SVGs have coordinate
 * spaces in the tens of thousands, causing a NoMemory crash inside sharp.
 */
const prepareSvg = (raw: string, size: number): Buffer => {
  let svg: string;
  try {
    svg = optimize(raw, {
      multipass: true,
      // SVGO 4 dropped `removeViewBox` from preset-default, so no override needed.
      // We rely on the viewBox below for raster sizing.
      plugins: ['preset-default'],
    }).data;
  } catch {
    svg = raw;
  }

  const viewBoxMatch = svg.match(/viewBox="([^"]*)"/);
  svg = svg
    .replace(/\s*\bwidth="[^"]*"/g, '')
    .replace(/\s*\bheight="[^"]*"/g, '')
    .replace(/<svg\b/, `<svg width="${size}" height="${size}"`);

  if (!viewBoxMatch) {
    svg = svg.replace(/<svg\b/, `<svg viewBox="0 0 ${size} ${size}"`);
  }

  return Buffer.from(svg, 'utf-8');
};

const convertToRaster = async (svgPath: string): Promise<void> => {
  const svgText = await fs.promises.readFile(svgPath, 'utf-8');
  const dir = path.dirname(svgPath);
  const base = path.basename(svgPath, '.svg');

  for (const size of IMAGE_SIZES) {
    for (const [ext, method] of [
      ['jpg', 'jpeg'],
      ['png', 'png'],
      ['webp', 'webp'],
    ] as const) {
      const outFile = path.join(dir, `${base}_${size}x${size}.${ext}`);
      try {
        await fs.promises.stat(outFile);
        continue;
      } catch {
        // does not exist — create it
      }
      try {
        const svgBuffer = prepareSvg(svgText, size);
        await sharp(svgBuffer, { density: 96 })
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          [method as 'jpeg' | 'png' | 'webp']({ quality: 90 })
          .toFile(outFile);
      } catch (err) {
        console.warn(`  Skipping ${path.basename(outFile)}: ${(err as Error).message}`);
      }
    }
  }
};

/**
 * MUTCD-specific alternate filename patterns. Only safe to apply when the
 * primary URL was already known to point at a `File:MUTCD_<code>.svg` page.
 * Using these on arbitrary Commons URLs risks downloading a US sign whose
 * code collides with a foreign country's code (e.g. Vienna `D3` vs MUTCD `D3`).
 */
const buildMutcdAlternateUrls = (code: string): string[] => {
  const base = 'https://commons.wikimedia.org/wiki/File:MUTCD_';
  const urls: string[] = [
    `${base}${code}R.svg`,
    `${base}${code}L.svg`,
  ];
  // Strip trailing lowercase variant letter (e.g. W1-1a → W1-1)
  const noVariant = code.replace(/[a-z]$/, '');
  if (noVariant !== code) {
    urls.push(`${base}${noVariant}.svg`, `${base}${noVariant}R.svg`, `${base}${noVariant}L.svg`);
  }
  // Strip trailing uppercase suffix (P = plaque, C = combo)
  const noSuffix = code.replace(/[PC]$/, '');
  if (noSuffix !== code && noSuffix !== noVariant) {
    urls.push(`${base}${noSuffix}.svg`);
  }
  return urls;
};

const isMutcdUrl = (url: string): boolean =>
  /\/File:MUTCD_/i.test(url) || /\/File%3AMUTCD_/i.test(url);

export const processSign = async (
  assetsRoot: string,
  category: string,
  code: string,
  imagePageUrl: string,
): Promise<void> => {
  const signDir = path.join(assetsRoot, category, sanitize(code));
  await fs.promises.mkdir(signDir, { recursive: true });

  const fileName = decodeURIComponent(path.basename(imagePageUrl)).replace(/^File:/, '');
  const dest = path.join(signDir, fileName.endsWith('.svg') ? fileName : `${sanitize(code)}.svg`);

  try {
    const stat = await fs.promises.stat(dest);
    if (stat.size > 0) {
      console.log(`  Skipping (exists): ${path.basename(dest)}`);
      await convertToRaster(dest);
      return;
    }
  } catch {
    // does not exist
  }

  let directUrl = await resolveWikimediaDirectUrl(imagePageUrl);

  // Only retry with MUTCD alternates when the primary URL was already a
  // `File:MUTCD_…` Commons page — otherwise a foreign sign could be silently
  // overwritten with a similarly-named US sign.
  if (!directUrl && isMutcdUrl(imagePageUrl)) {
    for (const altUrl of buildMutcdAlternateUrls(code)) {
      directUrl = await resolveWikimediaDirectUrl(altUrl);
      if (directUrl) break;
      await sleep(200);
    }
  }

  if (directUrl) {
    await downloadSvg(dest, directUrl);
    // downloadSvg may skip non-SVG content — only convert if file was actually written.
    try {
      const stat = await fs.promises.stat(dest);
      if (stat.size > 0) await convertToRaster(dest);
    } catch {
      // file not written — nothing to convert
    }
  }
};

const createSvgMap = async (assetsRoot: string): Promise<Record<string, string>> => {
  const svgMap: Record<string, string> = {};
  const files = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  for (const file of files) {
    const key = path.relative(assetsRoot, file).replace(/\\/g, '/');
    svgMap[key] = await fs.promises.readFile(file, 'utf-8');
  }
  return svgMap;
};

const createSvgSprite = async (assetsRoot: string, pkgDir: string): Promise<void> => {
  const svgMap = await createSvgMap(assetsRoot);
  const seen = new Set<string>();
  const symbols: string[] = [];

  for (const [key, raw] of Object.entries(svgMap)) {
    if (!raw.trimStart().startsWith('<')) continue;
    const id = sanitize(path.basename(key, '.svg')).replace(/_/g, '-');
    if (seen.has(id)) continue;
    seen.add(id);

    let optimized: string;
    try {
      optimized = optimize(raw, { multipass: true, plugins: ['preset-default'] }).data;
    } catch {
      console.warn(`  Skipping corrupt SVG in sprite: ${key}`);
      continue;
    }
    const svgContent = optimized
      .replace(/<\?xml[^>]*\?>/, '')
      .replace(/<!DOCTYPE[^>]*>/, '')
      .trim();
    const svgAttrsMatch = svgContent.match(/<svg([^>]*)>/);
    const svgAttrs = svgAttrsMatch ? svgAttrsMatch[1] : '';
    const viewBoxMatch = svgAttrs.match(/viewBox="([^"]*)"/);
    const viewBox = viewBoxMatch ? ` viewBox="${viewBoxMatch[1]}"` : '';
    const inner = svgContent.replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

    symbols.push(`  <symbol id="${id}"${viewBox}>${inner}</symbol>`);
  }

  const sprite = [
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">`,
    ...symbols,
    `</svg>`,
  ].join('\n');

  const distDir = path.join(pkgDir, 'dist');
  await fs.promises.mkdir(distDir, { recursive: true });
  await fs.promises.writeFile(path.join(distDir, 'sprite.svg'), sprite, 'utf-8');
  console.log(`  SVG sprite written (${seen.size} symbols)`);
};

const createCssSprite = async (assetsRoot: string, pkgDir: string, cc: string): Promise<void> => {
  const files = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  const seen = new Set<string>();
  const lines: string[] = [
    `/* Road signs — ${cc.toUpperCase()} — CSS sprite`,
    `   Generated by 'yarn update --country=${cc}'. Do not edit manually. */`,
  ];

  for (const file of files) {
    const rel = path.relative(assetsRoot, file).replace(/\\/g, '/');
    const className = `rs-${cc}-${sanitize(path.basename(file, '.svg')).replace(/_/g, '-')}`;
    if (seen.has(className)) continue;
    seen.add(className);
    lines.push(
      '',
      `.${className} {`,
      `  background-image: url('../assets/${rel}');`,
      `  background-position: center;`,
      `  background-repeat: no-repeat;`,
      `  background-size: contain;`,
      `}`,
    );
  }

  const distDir = path.join(pkgDir, 'dist');
  await fs.promises.mkdir(distDir, { recursive: true });
  await fs.promises.writeFile(path.join(distDir, 'sprite.css'), lines.join('\n') + '\n', 'utf-8');
  console.log(`  CSS sprite written (${seen.size} classes)`);
};

const createAssets = async (cc: string, data: GenericScrapedData): Promise<void> => {
  const pkgDir = path.join('packages', '@road-signs', cc);
  const assetsRoot = path.join(pkgDir, 'assets');

  // Flatten all signs into a single work list, skipping those without an image URL.
  const work: Array<{ category: string; code: string; imageUrl: string }> = [];
  for (const [category, signs] of Object.entries(data)) {
    for (const sign of signs) {
      if (sign.imageUrl) work.push({ category, code: sign.code, imageUrl: sign.imageUrl });
    }
  }

  console.log(`  Downloading ${work.length} signs (${CONCURRENCY} parallel, ${REQUEST_DELAY_MS}ms delay)...`);
  await withConcurrency(work, CONCURRENCY, ({ category, code, imageUrl }) =>
    processSign(assetsRoot, category, code, imageUrl),
  );

  console.log('\n  Building sprites...');
  await createSvgSprite(assetsRoot, pkgDir);
  await createCssSprite(assetsRoot, pkgDir, cc);
};

export default createAssets;

const isMain = process.argv[1]?.includes('create-assets');
const cc = isMain ? process.argv.find((a) => a.startsWith('--country='))?.split('=')[1] : undefined;
if (isMain && cc) {
  const scrapedPath = path.join('data', cc, 'scraped.json');
  if (!fs.existsSync(scrapedPath)) {
    console.error(`Missing ${scrapedPath}. Run 'yarn update --country=${cc}' first.`);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));
  createAssets(cc, data).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
