/**
 * dedup-scraped.ts
 *
 * One-shot utility: deduplicates all existing data/{cc}/scraped.json files
 * in place, then regenerates source for each country.
 *
 * Pass 1 — globally by imageUrl (same image = same sign, across categories).
 * Pass 2 — within each category by code (first occurrence wins).
 *
 * Usage: yarn tsx bin/dedup-scraped.ts
 */

import fs from 'fs';
import path from 'path';
import { generateSource } from './generate-source';

// Discover every country with a scraped.json under data/. Previously this was
// hard-coded to 10 countries, which silently skipped every newer scraper.
const discoverCountries = (): string[] => {
  const dataDir = 'data';
  if (!fs.existsSync(dataDir)) return [];
  return fs
    .readdirSync(dataDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(dataDir, d.name, 'scraped.json')))
    .map((d) => d.name)
    .sort();
};

const COUNTRIES = discoverCountries();

const dedup = (
  data: Record<string, Array<{ code: string; imageUrl: string | null }>>,
): { result: typeof data; removed: number } => {
  const seenUrls = new Set<string>();
  const seenCodes = new Set<string>(); // global — first category wins
  let removed = 0;
  const result: typeof data = {};

  for (const [category, signs] of Object.entries(data)) {
    result[category] = [];
    for (const sign of signs) {
      if (sign.imageUrl && seenUrls.has(sign.imageUrl)) { removed++; continue; }
      if (seenCodes.has(sign.code))                     { removed++; continue; }
      result[category].push(sign);
      seenCodes.add(sign.code);
      if (sign.imageUrl) seenUrls.add(sign.imageUrl);
    }
  }

  return { result, removed };
};

(async () => {
  for (const cc of COUNTRIES) {
    const p = path.join('data', cc, 'scraped.json');
    if (!fs.existsSync(p)) { console.log(`${cc}: no scraped.json — skipping`); continue; }

    const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
    const { result, removed } = dedup(raw);

    if (removed === 0) {
      console.log(`${cc}: no duplicates`);
    } else {
      fs.writeFileSync(p, JSON.stringify(result, null, 2), 'utf-8');
      console.log(`${cc}: removed ${removed} duplicate(s) — regenerating source…`);
      await generateSource(cc);
    }
  }
  console.log('\nDone.');
})();
