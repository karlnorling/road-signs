/* oxlint-disable no-await-in-loop */

/**
 * generate-source.ts
 *
 * Reads data/{cc}/scraped.json and the country package's assets directory,
 * then writes:
 *   packages/@road-signs/{cc}/src/signs.generated.ts
 *
 * Run via: yarn generate --country=us
 */

import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { globSync } from 'glob';

const IMAGE_SIZES = [240, 512, 768, 1024, 2048] as const;

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const cleanSvg = (svg: string): string =>
  svg
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .trim();

const UNIT_TO_PX: Record<string, number> = {
  '': 1,
  px: 1,
  in: 96,
  cm: 37.795,
  mm: 3.7795,
  pt: 1.333,
  pc: 16,
};

const parsePx = (val: string): number | null => {
  const m = val.match(/^([0-9.]+)(px|in|cm|mm|pt|pc|)$/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (isNaN(n) || n <= 0) return null;
  return n * (UNIT_TO_PX[m[2].toLowerCase()] ?? 1);
};

const normalizeSvg = (svg: string): string => {
  const cleaned = cleanSvg(svg);
  const hasViewBox = /\bviewBox=["']/i.test(cleaned);

  // Strip explicit w/h only from the root <svg> opening tag — CSS controls the rendered size.
  // Read them first (from the svg tag only) for viewBox synthesis below.
  // Accept both double- and single-quoted attribute values (Inkscape emits the latter).
  const wm = cleaned.match(/<svg\b[^>]*?\bwidth=["']([^"']*)["']/);
  const hm = cleaned.match(/<svg\b[^>]*?\bheight=["']([^"']*)["']/);

  const out = cleaned.replace(
    /(<svg\b)((?:[^>]|"[^"]*"|'[^']*')*)(>)/,
    (_, open, attrs: string, close) =>
      `${open}${attrs
        .replace(/\s*\bwidth=["'][^"']*["']/g, '')
        .replace(/\s*\bheight=["'][^"']*["']/g, '')}${close}`,
  );

  if (hasViewBox) return out;

  // Synthesise viewBox from width/height (handling px, in, cm, mm, pt units).
  const w = wm ? parsePx(wm[1]) : null;
  const h = hm ? parsePx(hm[1]) : null;

  if (w && h) {
    return out.replace(/<svg\b/, `<svg viewBox="0 0 ${Math.round(w)} ${Math.round(h)}"`);
  }

  // Fallback: neutral square canvas.
  return out.replace(/<svg\b/, `<svg viewBox="0 0 100 100"`);
};

const scopeIds = (body: string, prefix: string): string => {
  const ids = new Set<string>();
  body.replace(/\bid="([^"]+)"/g, (_, id: string) => {
    ids.add(id);
    return _;
  });
  if (ids.size === 0) return body;
  let out = body;
  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out
      .replace(new RegExp(`\\bid="${esc}"`, 'g'), `id="${prefix}-${id}"`)
      .replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefix}-${id})`)
      .replace(new RegExp(`href="#${esc}"`, 'g'), `href="#${prefix}-${id}"`);
  }
  return out;
};

const buildAssets = (relPath: string) => {
  const dir = path.dirname(relPath);
  const base = path.basename(relPath, path.extname(relPath));
  const ext = path.extname(relPath).slice(1).toLowerCase(); // 'svg' or 'png'
  const makeRecord = (imgExt: string): Record<number, string> =>
    Object.fromEntries(IMAGE_SIZES.map((s) => [s, `${dir}/${base}_${s}x${s}.${imgExt}`])) as Record<
      number,
      string
    >;
  return {
    jpg: makeRecord('jpg'),
    png: makeRecord('png'),
    svg: ext === 'svg' ? relPath : undefined,
    webp: makeRecord('webp'),
  };
};

interface PrimaryAsset {
  filePath: string;
  isPng: boolean;
}

const codeMatchesPath = (lower: string, rel: string): boolean => {
  // Require an exact path-segment match for ALL code lengths. Substring
  // inclusion lets short codes claim longer codes' assets — e.g. `B30`
  // would match a `/b300/` directory because "b300" contains "b30".
  // `create-assets.ts` always lays out signs as `<assetsRoot>/<cat>/<code>/<file>`,
  // so a segment boundary is reliably present.
  return rel.includes(`/${lower}/`) || rel.endsWith(`/${lower}`);
};

const normalisePath = (f: string): string =>
  f
    .replace(/\\/g, '/')
    .toLowerCase()
    .replace(/[^a-z0-9/]/g, '');

const findPrimaryAsset = (code: string, assetsRoot: string): PrimaryAsset | undefined => {
  // Strip ALL non-alphanumeric chars (including underscores, which \W keeps).
  const lower = code.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (lower.length < 2) return undefined;

  // Prefer SVG (vector source).
  const svgFiles = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  const svgFile = svgFiles.find((f) => codeMatchesPath(lower, normalisePath(f)));
  if (svgFile) return { filePath: svgFile, isPng: false };

  // Fall back to PNG (PDF-extracted signs have no SVG source).
  const pngFiles = globSync(path.join(assetsRoot, '**', '*.png')).filter(
    (f) => !/_\d+x\d+\.png$/.test(f),
  );
  const pngFile = pngFiles.find((f) => codeMatchesPath(lower, normalisePath(f)));
  if (pngFile) return { filePath: pngFile, isPng: true };

  return undefined;
};

export const generateSource = async (cc: string): Promise<void> => {
  const scrapedPath = path.join('data', cc, 'scraped.json');
  const pkgDir = path.join('packages', '@road-signs', cc);
  const assetsRoot = path.join(pkgDir, 'assets');

  if (!fs.existsSync(scrapedPath)) {
    throw new Error(`Missing ${scrapedPath}. Run 'yarn update --country=${cc}' first.`);
  }

  const scraped = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));
  const lines: string[] = [
    `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.`,
    `// Run 'yarn update --country=${cc}' to regenerate.`,
    `// @ts-nocheck — 1000+ literal objects exceed TypeScript's union complexity limit.`,
    ``,
    `import type { ${cc.toUpperCase()}Sign } from './types';`,
    ``,
    `export const signs: ${cc.toUpperCase()}Sign[] = [`,
  ];

  let count = 0;
  for (const [category, signs] of Object.entries(scraped) as [
    string,
    Array<{ code: string; name: string; imageUrl: string | null }>,
  ][]) {
    for (const sign of signs) {
      const asset = findPrimaryAsset(sign.code, assetsRoot);
      if (!asset) {
        console.warn(`  Skipping ${sign.code}: no matching asset file`);
        continue;
      }

      const id = slugify(`${sign.code}-${sign.name}`);
      const relPath = path.relative(pkgDir, asset.filePath).replace(/\\/g, '/');
      const assets = buildAssets(relPath);

      if (asset.isPng) {
        // PDF-extracted sign: PNG primary asset, no inline SVG.
        lines.push(
          `  {`,
          `    assets: {`,
          `      jpg: ${JSON.stringify(assets.jpg)},`,
          `      png: ${JSON.stringify(assets.png)},`,
          `      webp: ${JSON.stringify(assets.webp)},`,
          `    },`,
          `    category: ${JSON.stringify(category)},`,
          `    code: ${JSON.stringify(sign.code)},`,
          `    description: ${JSON.stringify(sign.name)},`,
          `    id: ${JSON.stringify(id)},`,
          `    name: ${JSON.stringify(sign.name)},`,
          `  },`,
        );
      } else {
        // SVG-sourced sign: inline SVG + full asset set.
        const raw = await fs.promises.readFile(asset.filePath, 'utf-8');
        let optimized: string;
        try {
          optimized = optimize(raw, { multipass: true, plugins: ['preset-default'] }).data;
        } catch {
          // Some SVGs (Inkscape bspline-heavy files) exceed SVGO's entity limit — use raw.
          optimized = raw;
        }
        const inlineSvg = scopeIds(normalizeSvg(cleanSvg(optimized)), id);
        lines.push(
          `  {`,
          `    assets: {`,
          `      jpg: ${JSON.stringify(assets.jpg)},`,
          `      png: ${JSON.stringify(assets.png)},`,
          `      svg: ${JSON.stringify(assets.svg)},`,
          `      webp: ${JSON.stringify(assets.webp)},`,
          `    },`,
          `    category: ${JSON.stringify(category)},`,
          `    code: ${JSON.stringify(sign.code)},`,
          `    description: ${JSON.stringify(sign.name)},`,
          `    id: ${JSON.stringify(id)},`,
          `    name: ${JSON.stringify(sign.name)},`,
          `    svg: ${JSON.stringify(inlineSvg)},`,
          `  },`,
        );
      }
      count++;
    }
  }

  lines.push(`];`);

  const outPath = path.join(pkgDir, 'src', 'signs.generated.ts');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf-8');
  console.log(`  Written ${outPath} (${count} signs)`);
};

if (process.argv[1]?.includes('generate-source')) {
  const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  if (cc) {
    generateSource(cc).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }
}
