/**
 * generate-search-index.ts
 *
 * Walks every @road-signs/* country package, pulls out every sign's
 * (cc, code, name, category, id, hasSvg) tuple, and writes the result to
 *   apps/docs/public/signs-index.json
 *
 * The docs site's /search page loads this file at runtime to power a
 * single global sign search across all countries — independent of
 * any per-country gallery search.
 *
 * Why not include the artwork?
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
import { PACKAGES_DIR, listCountries, readRegistry } from './lib/registry';

const OUT_PATH = path.join('apps', 'docs', 'public', 'signs-index.json');

interface SignEntry {
  cc: string;
  code: string;
  name: string;
  category: string;
  id: string;
  hasSvg: boolean;
}

const main = (): void => {
  if (!fs.existsSync(PACKAGES_DIR)) {
    console.error(`Missing ${PACKAGES_DIR} — run from repo root.`);
    process.exit(1);
  }

  const countries = listCountries();
  const all: SignEntry[] = [];
  for (const cc of countries) {
    for (const sign of readRegistry(cc)) {
      all.push({
        cc,
        code: sign.code,
        name: sign.name,
        category: sign.category,
        id: sign.id,
        hasSvg: Boolean(sign.svg),
      });
    }
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  const json = JSON.stringify(all);
  fs.writeFileSync(OUT_PATH, json, 'utf-8');

  const sizeMb = (Buffer.byteLength(json) / 1024 / 1024).toFixed(2);
  console.log(
    `Wrote ${OUT_PATH}: ${all.length} signs across ${countries.length} countries (${sizeMb} MB)`,
  );
};

main();
