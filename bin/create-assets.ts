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
import type { ScrapedData } from './scrape-us';

const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; build-script)';

const IMAGE_SIZES = [240, 512, 768, 1024, 2048] as const;

export const sanitize = (str: string): string =>
  str
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = 3, delayMs = 1000): Promise<Response> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (res.ok) return res;
    if ((res.status === 429 || res.status >= 500) && attempt < retries) {
      const wait = delayMs * 2 ** (attempt - 1);
      console.warn(`  ${res.status} on ${url} — retrying in ${wait}ms`);
      await sleep(wait);
      continue;
    }
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  throw new Error(`All retries exhausted for ${url}`);
};

const resolveWikimediaDirectUrl = async (filePageUrl: string): Promise<string | undefined> => {
  try {
    const res = await fetchWithRetry(filePageUrl);
    const html = await res.text();
    const doc = parse(html);
    const href = doc.querySelector('.fullImageLink a')?.getAttribute('href');
    return href ? `https:${href}` : undefined;
  } catch (err) {
    console.error(`  Error resolving image page ${filePageUrl}:`, (err as Error).message);
    return undefined;
  }
};

const downloadSvg = async (dest: string, url: string): Promise<void> => {
  try {
    const res = await fetchWithRetry(url);
    const content = await res.text();
    await fs.promises.writeFile(dest, content);
    console.log(`  Downloaded: ${path.basename(dest)}`);
  } catch (err) {
    console.error(`  Error downloading ${url}:`, (err as Error).message);
  }
};

/**
 * Injects explicit width/height into an SVG at the target pixel size so
 * librsvg knows what canvas to render onto. Without this, SVGs that only
 * have a viewBox (or no dimensions at all) trigger a NoMemory crash inside
 * sharp's libvips/librsvg backend when the renderer tries an unbounded size.
 */
const stampSvgSize = (svg: string, size: number): Buffer => {
  const viewBoxMatch = svg.match(/viewBox="([^"]*)"/);
  let out = svg
    .replace(/\s*\bwidth="[^"]*"/, '')
    .replace(/\s*\bheight="[^"]*"/, '')
    .replace(/<svg\b/, `<svg width="${size}" height="${size}"`);
  if (!viewBoxMatch) {
    out = out.replace(/<svg\b/, `<svg viewBox="0 0 ${size} ${size}"`);
  }
  return Buffer.from(out, 'utf-8');
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
      const svgBuffer = stampSvgSize(svgText, size);
      await sharp(svgBuffer, { density: 96 })
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        [method as 'jpeg' | 'png' | 'webp']({ quality: 90 })
        .toFile(outFile);
    }
  }
};

const processSign = async (
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

  const directUrl = await resolveWikimediaDirectUrl(imagePageUrl);
  if (directUrl) {
    await downloadSvg(dest, directUrl);
    await sleep(300);
    await convertToRaster(dest);
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
    const id = sanitize(path.basename(key, '.svg')).replace(/_/g, '-');
    if (seen.has(id)) continue;
    seen.add(id);

    const optimized = optimize(raw, { multipass: true, plugins: ['preset-default'] }).data;
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

const createAssets = async (cc: string, data: ScrapedData): Promise<void> => {
  const pkgDir = path.join('packages', '@road-signs', cc);
  const assetsRoot = path.join(pkgDir, 'assets');

  for (const [category, signs] of Object.entries(data)) {
    for (const sign of signs) {
      if (!sign.imageUrl) continue;
      await processSign(assetsRoot, category, sign.code, sign.imageUrl);
    }
  }

  console.log('\n  Building sprites...');
  await createSvgSprite(assetsRoot, pkgDir);
  await createCssSprite(assetsRoot, pkgDir, cc);
};

export default createAssets;
