/**
 * populate-minimal-countries.ts
 *
 * For countries with a tiny but real Commons footprint (1–6 SVGs), writes
 * data/<cc>/scraped.json with the known sign entries, then runs the
 * standard pipeline (create-assets + generate-source) to download the
 * SVGs, rasterise them, and emit the per-package signs.generated.ts.
 *
 * Each entry below was verified via Commons full-text search; titles map
 * to the actual filenames on commons.wikimedia.org.
 *
 * Usage:  yarn tsx bin/populate-minimal-countries.ts
 *         yarn tsx bin/populate-minimal-countries.ts --country=bt
 *
 * After running, sidebar/coverage pages will reflect the new sign counts
 * once `yarn generate-docs` is re-run.
 */

import fs from 'fs';
import path from 'path';
import createAssets from './create-assets';
import { generateSource } from './generate-source';

type Category = 'warning' | 'priority' | 'prohibitory' | 'mandatory' | 'information';

interface Entry {
  code: string;
  name: string;
  category: Category;
  /** Commons filename (without the "File:" prefix). */
  file: string;
}

const COUNTRIES: Record<string, { name: string; entries: Entry[] }> = {
  bt: {
    name: 'Bhutan',
    entries: [
      { code: 'STOP', name: 'Stop', category: 'priority', file: 'Bhutan_stop_sign.svg' },
      { code: 'PNH1', name: 'Primary National Highway 1 shield', category: 'information', file: 'PNH1-Bhutan.svg' },
      { code: 'PNH3', name: 'Primary National Highway 3 shield', category: 'information', file: 'PNH3-Bhutan.svg' },
      { code: 'PNH4', name: 'Primary National Highway 4 shield', category: 'information', file: 'PNH4-Bhutan.svg' },
      { code: 'PNH5', name: 'Primary National Highway 5 shield', category: 'information', file: 'PNH5-Bhutan.svg' },
      { code: 'PNH12', name: 'Primary National Highway 12 shield', category: 'information', file: 'PNH12-Bhutan.svg' },
    ],
  },
  lr: {
    name: 'Liberia',
    entries: [
      { code: 'R1-STOP', name: 'Stop', category: 'priority', file: 'Liberian_Road_Signs_-_Regulatory_Sign_-_Stop.svg' },
      { code: 'R1-YIELD', name: 'Yield', category: 'priority', file: 'Liberian_Road_Signs_-_Regulatory_Sign_-_Yield.svg' },
      { code: 'R5-1', name: 'No Entry', category: 'prohibitory', file: 'Liberian_Road_Signs_-_Regulatory_Sign_-_No_Entry.svg' },
    ],
  },
  to: {
    name: 'Tonga',
    entries: [
      { code: 'STOP', name: 'Stop', category: 'priority', file: 'Tonga_-_STOP_sign.svg' },
      { code: 'GIVE_WAY', name: 'Give Way', category: 'priority', file: 'Tonga_-_Give_Way_sign.svg' },
    ],
  },
  ws: {
    name: 'Samoa',
    entries: [
      { code: 'FORD', name: 'Ford', category: 'warning', file: 'Samoa_road_sign_–_Ford.svg' },
      { code: 'SPEED-50', name: 'Speed Limit 50', category: 'prohibitory', file: 'Samoa_-_Speed_Limit.svg' },
    ],
  },
  vu: {
    name: 'Vanuatu',
    entries: [
      { code: 'STOP', name: 'Stop', category: 'priority', file: 'Vanuatu_stop_sign.svg' },
    ],
  },
  bh: {
    name: 'Bahrain',
    entries: [
      { code: 'GIVE_WAY', name: 'Give Way', category: 'priority', file: 'BH_road_sign_-_give_way.svg' },
    ],
  },
};

const buildScrapedJson = (cc: string): void => {
  const data = COUNTRIES[cc];
  if (!data) throw new Error(`Unknown country: ${cc}`);

  // Group by category to match the scraped.json shape consumed by create-assets.
  const grouped: Record<string, Array<{ code: string; name: string; imageUrl: string; category: string }>> = {};
  for (const e of data.entries) {
    if (!grouped[e.category]) grouped[e.category] = [];
    grouped[e.category].push({
      code: e.code,
      name: e.name,
      // Commons file-page URL. processSign resolves it to a direct download.
      imageUrl: `https://commons.wikimedia.org/wiki/File:${e.file}`,
      category: e.category,
    });
  }

  const dir = path.join('data', cc);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'scraped.json'), JSON.stringify(grouped, null, 2), 'utf-8');
  console.log(`  Wrote data/${cc}/scraped.json (${data.entries.length} signs)`);
};

const main = async (): Promise<void> => {
  const ccArg = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  const countries = ccArg ? [ccArg] : Object.keys(COUNTRIES);

  for (const cc of countries) {
    if (!COUNTRIES[cc]) {
      console.warn(`Skipping ${cc} (no entry table)`);
      continue;
    }
    console.log(`\n=== ${cc.toUpperCase()} ${COUNTRIES[cc].name} ===`);
    buildScrapedJson(cc);

    const scraped = JSON.parse(fs.readFileSync(path.join('data', cc, 'scraped.json'), 'utf-8'));
    console.log(`  Downloading assets…`);
    await createAssets(cc, scraped);

    console.log(`  Generating source…`);
    await generateSource(cc);
  }

  console.log('\nDone. Run `yarn generate-docs` to refresh coverage tables.');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
