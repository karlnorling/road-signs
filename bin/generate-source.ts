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

const normalizeSvg = (svg: string): string => {
  const cleaned = cleanSvg(svg);
  if (/\bviewBox="/i.test(cleaned)) return cleaned;
  const wm = cleaned.match(/\bwidth="([0-9.]+)(?:px)?"/);
  const hm = cleaned.match(/\bheight="([0-9.]+)(?:px)?"/);
  if (!wm || !hm) return cleaned;
  return cleaned.replace(/<svg\b/, `<svg viewBox="0 0 ${wm[1]} ${hm[1]}"`);
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

const buildAssets = (svgRelPath: string) => {
  const dir = path.dirname(svgRelPath);
  const base = path.basename(svgRelPath, path.extname(svgRelPath));
  const makeRecord = (ext: string): Record<number, string> =>
    Object.fromEntries(IMAGE_SIZES.map((s) => [s, `${dir}/${base}_${s}x${s}.${ext}`])) as Record<
      number,
      string
    >;
  return {
    jpg: makeRecord('jpg'),
    png: makeRecord('png'),
    svg: svgRelPath,
    webp: makeRecord('webp'),
  };
};

const findSvgForSign = (code: string, assetsRoot: string): string | undefined => {
  const files = globSync(path.join(assetsRoot, '**', '*.svg')).filter(
    (f) => !/_\d+x\d+\.svg$/.test(f),
  );
  const lower = code.toLowerCase().replace(/\W/g, '');
  return files.find((f) => {
    const base = path.basename(f, '.svg').toLowerCase().replace(/\W/g, '');
    return base.includes(lower);
  });
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
    ``,
    `import type { USSign } from './types';`,
    ``,
    `export const signs: USSign[] = [`,
  ];

  let count = 0;
  for (const [category, signs] of Object.entries(scraped) as [
    string,
    Array<{ code: string; name: string; imageUrl: string | null }>,
  ][]) {
    for (const sign of signs) {
      const id = slugify(`${sign.code}-${sign.name}`);
      const svgFile = findSvgForSign(sign.code, assetsRoot);
      let inlineSvg = '';

      if (svgFile) {
        const raw = await fs.promises.readFile(svgFile, 'utf-8');
        const optimized = optimize(raw, { multipass: true, plugins: ['preset-default'] }).data;
        inlineSvg = scopeIds(normalizeSvg(cleanSvg(optimized)), id);
      }

      const assets = svgFile
        ? buildAssets(path.relative(pkgDir, svgFile).replace(/\\/g, '/'))
        : { jpg: {}, png: {}, svg: '', webp: {} };

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
      count++;
    }
  }

  lines.push(`];`);

  const outPath = path.join(pkgDir, 'src', 'signs.generated.ts');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf-8');
  console.log(`  Written ${outPath} (${count} signs)`);
};

const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
if (cc) {
  generateSource(cc).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
