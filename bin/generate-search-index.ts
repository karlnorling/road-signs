/**
 * generate-search-index.ts
 *
 * Walks every @road-signs/* country package, pulls out every sign's
 * (cc, code, name, category, id, hasSvg) tuple, and writes the result to
 *   apps/docs/public/signs-index.json
 *
 * The docs site's /search page loads this file at runtime to power a
 * single global sign search across all 197 countries — independent of
 * any per-country gallery search.
 *
 * Why not include inline SVG?
 *   The combined inline-SVG payload across every country is ~50 MB even
 *   after gzip. Search results are intentionally text-only with a link
 *   into each sign's country gallery; that keeps the index tiny (~2–3 MB
 *   uncompressed) and the load fast.
 *
 * Usage:  yarn generate-search-index
 * Auto-runs as part of the docs build via apps/docs/package.json.
 */

import fs from 'fs';
import path from 'path';

const PACKAGES_DIR = path.join('packages', '@road-signs');
const OUT_PATH = path.join('apps', 'docs', 'public', 'signs-index.json');

interface SignEntry {
  cc: string;
  code: string;
  name: string;
  category: string;
  id: string;
  hasSvg: boolean;
}

/**
 * For a country's signs.generated.ts, return every sign source file path.
 * Handles both single-file and sharded layouts.
 */
const collectSignSources = (srcDir: string): string[] => {
  const primary = path.join(srcDir, 'signs.generated.ts');
  if (!fs.existsSync(primary)) return [];
  const src = fs.readFileSync(primary, 'utf-8');
  const shardImports = [...src.matchAll(/from\s+['"]\.\/(signs\.[a-z0-9_]+\.generated)['"]/gi)];
  if (shardImports.length === 0) return [primary];
  return shardImports
    .map((m) => path.join(srcDir, `${m[1]}.ts`))
    .filter(fs.existsSync);
};

/**
 * For a sign-literal source, extract every sign as a SignEntry.
 * The generated format puts each sign in a block ending with `\n  },\n`.
 */
const extractSignsFromSource = (cc: string, src: string): SignEntry[] => {
  const entries: SignEntry[] = [];
  for (const blockSrc of src.split(/\n  \},\n/)) {
    const codeM = blockSrc.match(/\bcode:\s*"([^"]+)"/);
    const idM = blockSrc.match(/\bid:\s*"([^"]+)"/);
    const catM = blockSrc.match(/\bcategory:\s*"([^"]+)"/);
    const nameM = blockSrc.match(/\bname:\s*"((?:[^"\\]|\\.)*)"/);
    if (!codeM || !idM || !catM || !nameM) continue;
    const name = nameM[1].replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    const hasSvg = /\bsvg:\s*"/.test(blockSrc);
    entries.push({
      cc,
      code: codeM[1],
      name,
      category: catM[1],
      id: idM[1],
      hasSvg,
    });
  }
  return entries;
};

const main = (): void => {
  if (!fs.existsSync(PACKAGES_DIR)) {
    console.error(`Missing ${PACKAGES_DIR} — run from repo root.`);
    process.exit(1);
  }

  const countries = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name))
    .map((d) => d.name)
    .sort();

  const all: SignEntry[] = [];
  for (const cc of countries) {
    const srcDir = path.join(PACKAGES_DIR, cc, 'src');
    for (const src of collectSignSources(srcDir)) {
      const fileContents = fs.readFileSync(src, 'utf-8');
      all.push(...extractSignsFromSource(cc, fileContents));
    }
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(all), 'utf-8');

  const sizeMb = (Buffer.byteLength(JSON.stringify(all)) / 1024 / 1024).toFixed(2);
  console.log(`Wrote ${OUT_PATH}: ${all.length} signs across ${countries.length} countries (${sizeMb} MB)`);
};

main();
