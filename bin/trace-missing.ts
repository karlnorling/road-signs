/* oxlint-disable no-await-in-loop */

/**
 * trace-missing.ts
 *
 * For each country, finds signs that have a scraped entry but no local SVG
 * asset, then converts the source image (PNG or SVG-served-as-PNG) to a
 * traced SVG via potrace posterize and saves it alongside the existing assets.
 *
 * Usage:
 *   yarn trace-missing --country=my
 *   yarn trace-missing --all
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import Potrace from 'potrace';
import sharp from 'sharp';
import { optimize } from 'svgo';
import { generateSource } from './generate-source';
import { sanitize } from './create-assets';

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; trace-missing)';
const IMAGE_SIZES = [240, 512, 768, 1024, 2048] as const;
const CONCURRENCY = 3;
const REQUEST_DELAY_MS = 800;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Wikimedia helpers
// ---------------------------------------------------------------------------

const fetchWithRetry = async (url: string, retries = 5, baseMs = 5000): Promise<Response> => {
  for (let i = 1; i <= retries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.ok) return res;
    if ((res.status === 429 || res.status >= 500) && i < retries) {
      const after = res.headers.get('retry-after');
      const wait = after ? parseInt(after, 10) * 1000 : baseMs * 2 ** (i - 1);
      console.warn(`    ${res.status} — retrying in ${Math.round(wait / 1000)}s`);
      await sleep(wait);
      continue;
    }
    throw new Error(`HTTP ${res.status}: ${url}`);
  }
  throw new Error(`All retries exhausted: ${url}`);
};

/**
 * Given a Wikimedia file page URL (e.g. commons.wikimedia.org/wiki/File:X.png),
 * returns a direct PNG download URL at ~512px width via the MediaWiki imageinfo API.
 */
const resolveImageUrl = async (filePageUrl: string): Promise<string | null> => {
  // Extract file title from URL
  const match = filePageUrl.match(/[/=](File:[^/&#?]+)$/i);
  if (!match) return null;
  const title = decodeURIComponent(match[1]);

  const api = filePageUrl.includes('wikipedia.org')
    ? `https://en.wikipedia.org/w/api.php`
    : `https://commons.wikimedia.org/w/api.php`;

  const url =
    `${api}?action=query&titles=${encodeURIComponent(title)}` +
    `&prop=imageinfo&iiprop=url&iiurlwidth=512&format=json&origin=*`;

  try {
    const res = await fetchWithRetry(url);
    const json = (await res.json()) as {
      query: { pages: Record<string, { imageinfo?: Array<{ thumburl?: string; url?: string }> }> };
    };
    const page = Object.values(json.query?.pages ?? {})[0];
    const info = page?.imageinfo?.[0];
    // thumburl is the rasterised PNG at the requested width; fall back to url.
    return info?.thumburl ?? info?.url ?? null;
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
// Local asset helpers (mirrors fill-gaps / verify logic)
// ---------------------------------------------------------------------------

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const buildLocalTokens = (assetsRoot: string): Set<string> => {
  const files = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  const tokens = new Set<string>();
  for (const f of files) {
    tokens.add(normalise(path.basename(f, '.svg')));
    tokens.add(normalise(f.replace(/\\/g, '/').replace(/\.svg$/i, '')));
  }
  return tokens;
};

const hasLocalSvg = (code: string, tokens: Set<string>): boolean => {
  const t = normalise(code);
  if (t.length < 2) return true; // too short to match reliably — skip
  for (const local of tokens) {
    if (local === t || local.includes(t) || t.includes(local)) return true;
  }
  return false;
};

// ---------------------------------------------------------------------------
// PNG → SVG tracing
// ---------------------------------------------------------------------------

/**
 * Preprocess a PNG buffer with sharp: flatten transparency onto white,
 * resize to a fixed square canvas, return a PNG buffer ready for potrace.
 */
const preprocessPng = async (pngBuffer: Buffer): Promise<Buffer> => {
  return sharp(pngBuffer)
    .flatten({ background: '#ffffff' })
    .resize(512, 512, { fit: 'contain', background: '#ffffff' })
    .png()
    .toBuffer();
};

/**
 * Trace a PNG buffer to an SVG string using potrace posterize.
 * Posterize produces a layered, multi-colour vector approximation.
 */
const traceToSvg = (pngBuffer: Buffer): Promise<string> =>
  new Promise((resolve, reject) => {
    Potrace.posterize(
      pngBuffer,
      {
        steps: 4, // colour quantisation levels
        // potrace v2 dropped the THRESHOLD_AUTO static; `-1` is the documented sentinel.
        threshold: -1,
        background: '#ffffff',
      },
      (err: Error | null, svg: string) => {
        if (err) reject(err);
        else resolve(svg);
      },
    );
  });

/**
 * Optimise an SVG string with SVGO and stamp explicit dimensions so sharp
 * can rasterise it without memory issues on large viewBox coordinates.
 */
const optimiseSvg = (raw: string): string => {
  let svg: string;
  try {
    svg = optimize(raw, {
      multipass: true,
      // SVGO 4 dropped removeViewBox from preset-default; no override needed.
      plugins: ['preset-default'],
    }).data;
  } catch {
    svg = raw;
  }
  // Ensure explicit width/height.
  const hasViewBox = /viewBox="[^"]+"/.test(svg);
  svg = svg
    .replace(/\s*\bwidth="[^"]*"/g, '')
    .replace(/\s*\bheight="[^"]*"/g, '')
    .replace(/<svg\b/, '<svg width="512" height="512"');
  if (!hasViewBox) {
    svg = svg.replace(/<svg\b/, '<svg viewBox="0 0 512 512"');
  }
  return svg;
};

// ---------------------------------------------------------------------------
// Raster conversion (mirrors create-assets.ts)
// ---------------------------------------------------------------------------

const prepareSvgForRaster = (raw: string, size: number): Buffer => {
  let svg: string;
  try {
    svg = optimize(raw, {
      multipass: true,
      // SVGO 4 dropped removeViewBox from preset-default; no override needed.
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
        /* create */
      }
      try {
        const buf = prepareSvgForRaster(svgText, size);
        await sharp(buf, { density: 96 })
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          [method as 'jpeg' | 'png' | 'webp']({ quality: 90 })
          .toFile(outFile);
      } catch (err) {
        console.warn(`    Raster skip ${path.basename(outFile)}: ${(err as Error).message}`);
      }
    }
  }
};

// ---------------------------------------------------------------------------
// Per-sign processing
// ---------------------------------------------------------------------------

interface ScrapedSign {
  code: string;
  name: string;
  imageUrl: string | null;
  category: string;
}

const traceSign = async (
  assetsRoot: string,
  category: string,
  code: string,
  imageUrl: string,
): Promise<boolean> => {
  const signDir = path.join(assetsRoot, category, sanitize(code));
  await fs.promises.mkdir(signDir, { recursive: true });

  const dest = path.join(signDir, `${sanitize(code)}.traced.svg`);

  // Skip if already traced.
  try {
    await fs.promises.stat(dest);
    console.log(`  Skip (exists): ${sanitize(code)}`);
    return true;
  } catch {
    /* proceed */
  }

  // Resolve the PNG URL.
  const pngUrl = await resolveImageUrl(imageUrl);
  if (!pngUrl) {
    console.warn(`  No image URL resolved for ${code}`);
    return false;
  }

  // Skip if it's actually an SVG (shouldn't happen — means create-assets missed it).
  if (pngUrl.toLowerCase().endsWith('.svg')) {
    console.warn(`  ${code}: resolved URL is already SVG — skipping trace`);
    return false;
  }

  let pngBuffer: Buffer;
  try {
    const res = await fetchWithRetry(pngUrl);
    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('image/png') && !ct.includes('image/jpeg') && !ct.includes('image/')) {
      console.warn(`  ${code}: unexpected content-type "${ct}"`);
      return false;
    }
    pngBuffer = Buffer.from(await res.arrayBuffer());
  } catch (err) {
    console.warn(`  ${code}: download failed — ${(err as Error).message}`);
    return false;
  }

  try {
    const preprocessed = await preprocessPng(pngBuffer);
    const svg = await traceToSvg(preprocessed);
    const optimised = optimiseSvg(svg);
    await fs.promises.writeFile(dest, optimised, 'utf-8');
    await convertToRaster(dest);
    console.log(`  Traced: ${sanitize(code)}`);
    return true;
  } catch (err) {
    console.warn(`  ${code}: trace failed — ${(err as Error).message}`);
    return false;
  }
};

// ---------------------------------------------------------------------------
// Per-country logic
// ---------------------------------------------------------------------------

const withConcurrency = async <T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>,
): Promise<void> => {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (queue.length > 0) {
        const item = queue.shift()!;
        await fn(item);
        if (queue.length > 0) await sleep(REQUEST_DELAY_MS);
      }
    }),
  );
};

const traceCountry = async (cc: string): Promise<void> => {
  const scrapedPath = path.join('data', cc, 'scraped.json');
  if (!fs.existsSync(scrapedPath)) {
    console.log(`  No scraped data for ${cc.toUpperCase()} — run yarn update first`);
    return;
  }

  const scraped: Record<string, ScrapedSign[]> = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));

  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  let tokens = buildLocalTokens(assetsRoot);

  // Collect all signs that lack a local SVG and have an imageUrl.
  const missing: Array<{ category: string; code: string; imageUrl: string }> = [];
  for (const [category, signs] of Object.entries(scraped)) {
    for (const sign of signs) {
      if (sign.imageUrl && !hasLocalSvg(sign.code, tokens)) {
        missing.push({ category, code: sign.code, imageUrl: sign.imageUrl });
      }
    }
  }

  if (missing.length === 0) {
    console.log(`  Nothing missing for ${cc.toUpperCase()}`);
    return;
  }

  console.log(`  ${missing.length} signs to trace for ${cc.toUpperCase()}`);
  let traced = 0;

  await withConcurrency(missing, CONCURRENCY, async ({ category, code, imageUrl }) => {
    const ok = await traceSign(assetsRoot, category, code, imageUrl);
    if (ok) {
      traced++;
      // Refresh tokens so subsequent checks see the new file.
      tokens = buildLocalTokens(assetsRoot);
    }
  });

  console.log(`  Done: ${traced}/${missing.length} traced`);

  if (traced > 0) {
    console.log(`  Regenerating source...`);
    await generateSource(cc);
  }
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const ALL_COUNTRIES = (() => {
  const dataDir = 'data';
  if (!fs.existsSync(dataDir)) return [];
  return fs
    .readdirSync(dataDir)
    .filter((f) => fs.existsSync(path.join(dataDir, f, 'scraped.json')));
})();

const getCountries = (): string[] => {
  if (process.argv.includes('--all')) return ALL_COUNTRIES;
  const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  if (!cc) {
    console.error('Usage: yarn trace-missing --country=XX | --all');
    process.exit(1);
  }
  return [cc];
};

(async () => {
  const countries = getCountries();
  console.log(`trace-missing: ${countries.join(', ')}\n`);
  for (const cc of countries) {
    console.log(`\n=== ${cc.toUpperCase()} ===`);
    await traceCountry(cc);
  }
  console.log('\nAll done.');
})();
