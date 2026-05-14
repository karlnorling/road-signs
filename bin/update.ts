/* oxlint-disable no-await-in-loop */

/**
 * update.ts
 *
 * Full pipeline: scrape → cache → create assets → generate source.
 *
 * Usage:
 *   yarn update --country=us
 *   yarn update --country=uk
 *   yarn update --all
 */

import fs from 'fs';
import path from 'path';

const SCRAPERS: Record<string, string> = {
  us: './scrape-us',
};

const getCountries = (): string[] => {
  const allFlag = process.argv.includes('--all');
  if (allFlag) return Object.keys(SCRAPERS);
  const cc = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  if (!cc) {
    console.error('Usage: yarn update --country=us | --all');
    process.exit(1);
  }
  if (!SCRAPERS[cc]) {
    console.error(
      `No scraper registered for country "${cc}". Available: ${Object.keys(SCRAPERS).join(', ')}`,
    );
    process.exit(1);
  }
  return [cc];
};

const runCountry = async (cc: string): Promise<void> => {
  console.log(`\n=== ${cc.toUpperCase()} ===`);

  console.log('Step 1/3: Scraping...');
  const scraperModule = await import(SCRAPERS[cc]);
  const scrape = scraperModule.default;
  const data = await scrape();

  const dataDir = path.join('data', cc);
  await fs.promises.mkdir(dataDir, { recursive: true });
  const cacheFile = path.join(dataDir, 'scraped.json');
  await fs.promises.writeFile(cacheFile, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  Cached to ${cacheFile}`);

  console.log('Step 2/3: Creating assets...');
  const { default: createAssets } = await import('./create-assets');
  await createAssets(cc, data);

  console.log('Step 3/3: Generating source...');
  const { generateSource } = await import('./generate-source');
  await generateSource(cc);
};

(async () => {
  const countries = getCountries();
  for (const cc of countries) {
    await runCountry(cc);
  }
  console.log('\nAll done!');
})();
