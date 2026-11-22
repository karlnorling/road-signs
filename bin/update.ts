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
  ad: './scrape-ad',
  ae: './scrape-ae',
  ag: './scrape-ag',
  al: './scrape-al',
  am: './scrape-am',
  ao: './scrape-ao',
  ar: './scrape-ar',
  at: './scrape-at',
  au: './scrape-au',
  az: './scrape-az',
  ba: './scrape-ba',
  bb: './scrape-bb',
  bd: './scrape-bd',
  be: './scrape-be',
  bg: './scrape-bg',
  bn: './scrape-bn',
  bo: './scrape-bo',
  br: './scrape-br',
  bs: './scrape-bs',
  bw: './scrape-bw',
  by: './scrape-by',
  bz: './scrape-bz',
  ca: './scrape-ca',
  ch: './scrape-ch',
  ci: './scrape-ci',
  cl: './scrape-cl',
  cm: './scrape-cm',
  cn: './scrape-cn',
  co: './scrape-co',
  cr: './scrape-cr',
  cu: './scrape-cu',
  cy: './scrape-cy',
  cz: './scrape-cz',
  de: './scrape-de',
  dk: './scrape-dk',
  dm: './scrape-dm',
  do: './scrape-do',
  dz: './scrape-dz',
  ec: './scrape-ec',
  ee: './scrape-ee',
  eg: './scrape-eg',
  es: './scrape-es',
  et: './scrape-et',
  fi: './scrape-fi',
  fj: './scrape-fj',
  fr: './scrape-fr',
  gd: './scrape-gd',
  ge: './scrape-ge',
  gh: './scrape-gh',
  gr: './scrape-gr',
  gt: './scrape-gt',
  gy: './scrape-gy',
  hn: './scrape-hn',
  hr: './scrape-hr',
  ht: './scrape-ht',
  hu: './scrape-hu',
  id: './scrape-id',
  ie: './scrape-ie',
  il: './scrape-il',
  in: './scrape-in',
  iq: './scrape-iq',
  ir: './scrape-ir',
  is: './scrape-is',
  it: './scrape-it',
  jm: './scrape-jm',
  jo: './scrape-jo',
  jp: './scrape-jp',
  ke: './scrape-ke',
  kg: './scrape-kg',
  kh: './scrape-kh',
  kn: './scrape-kn',
  kp: './scrape-kp',
  kr: './scrape-kr',
  kw: './scrape-kw',
  kz: './scrape-kz',
  la: './scrape-la',
  lb: './scrape-lb',
  lc: './scrape-lc',
  li: './scrape-li',
  lk: './scrape-lk',
  ls: './scrape-ls',
  lt: './scrape-lt',
  lu: './scrape-lu',
  lv: './scrape-lv',
  ly: './scrape-ly',
  ma: './scrape-ma',
  mc: './scrape-mc',
  md: './scrape-md',
  me: './scrape-me',
  mg: './scrape-mg',
  mk: './scrape-mk',
  mm: './scrape-mm',
  mn: './scrape-mn',
  mt: './scrape-mt',
  mu: './scrape-mu',
  mw: './scrape-mw',
  mx: './scrape-mx',
  my: './scrape-my',
  mz: './scrape-mz',
  na: './scrape-na',
  ng: './scrape-ng',
  ni: './scrape-ni',
  nl: './scrape-nl',
  no: './scrape-no',
  np: './scrape-np',
  nz: './scrape-nz',
  om: './scrape-om',
  pa: './scrape-pa',
  pe: './scrape-pe',
  pg: './scrape-pg',
  ph: './scrape-ph',
  pk: './scrape-pk',
  pl: './scrape-pl',
  pt: './scrape-pt',
  py: './scrape-py',
  qa: './scrape-qa',
  ro: './scrape-ro',
  rs: './scrape-rs',
  ru: './scrape-ru',
  rw: './scrape-rw',
  sa: './scrape-sa',
  se: './scrape-se',
  sg: './scrape-sg',
  si: './scrape-si',
  sk: './scrape-sk',
  // sm: re-exports @road-signs/it — no separate scrape required.
  sn: './scrape-sn',
  sr: './scrape-sr',
  sv: './scrape-sv',
  sy: './scrape-sy',
  sz: './scrape-sz',
  th: './scrape-th',
  tj: './scrape-tj',
  tm: './scrape-tm',
  tn: './scrape-tn',
  tr: './scrape-tr',
  tt: './scrape-tt',
  tw: './scrape-tw',
  tz: './scrape-tz',
  ua: './scrape-ua',
  ug: './scrape-ug',
  uk: './scrape-uk',
  us: './scrape-us',
  uy: './scrape-uy',
  uz: './scrape-uz',
  vc: './scrape-vc',
  ve: './scrape-ve',
  vn: './scrape-vn',
  xk: './scrape-xk',
  ye: './scrape-ye',
  za: './scrape-za',
  zm: './scrape-zm',
  zw: './scrape-zw',
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

/** Remove duplicate signs from scraped data.
 *  Pass 1 — globally by imageUrl: same image in any category = same sign.
 *  Pass 2 — within each category by code: keeps first occurrence.
 */
const deduplicateScraped = (
  data: Record<string, Array<{ code: string; imageUrl: string | null }>>,
): { result: typeof data; removed: number } => {
  const seenUrls = new Set<string>();
  const seenCodes = new Set<string>(); // global — first category wins
  let removed = 0;
  const result: typeof data = {};

  for (const [category, signs] of Object.entries(data)) {
    result[category] = [];
    for (const sign of signs) {
      if (sign.imageUrl && seenUrls.has(sign.imageUrl)) {
        removed++;
        continue;
      }
      if (seenCodes.has(sign.code)) {
        removed++;
        continue;
      }
      result[category].push(sign);
      seenCodes.add(sign.code);
      if (sign.imageUrl) seenUrls.add(sign.imageUrl);
    }
  }

  return { result, removed };
};

const runCountry = async (cc: string, cached: boolean, sourceOnly: boolean): Promise<void> => {
  console.log(`\n=== ${cc.toUpperCase()} ===`);

  const dataDir = path.join('data', cc);
  const cacheFile = path.join(dataDir, 'scraped.json');
  let data: Record<string, Array<{ code: string; imageUrl: string | null }>>;

  if (cached) {
    // Rebuild assets and source from the existing scrape. Needed after
    // `yarn refetch-svgs` drops a real SVG next to a traced one: the artwork
    // changed on disk but the scrape did not, and re-scraping would mean
    // hammering Wikipedia for a result already cached here.
    console.log(`Step 1/${sourceOnly ? 2 : 3}: Reusing ${cacheFile}`);
    data = JSON.parse(await fs.promises.readFile(cacheFile, 'utf-8')) as typeof data;
  } else {
    console.log('Step 1/3: Scraping...');
    const scraperModule = await import(SCRAPERS[cc]);
    const scrape = scraperModule.default;
    const rawData = await scrape();
    const deduped = deduplicateScraped(rawData);
    data = deduped.result;
    if (deduped.removed > 0) console.log(`  Removed ${deduped.removed} duplicate sign(s)`);

    const count = (d: typeof data): number =>
      Object.values(d).reduce((n, signs) => n + signs.length, 0);

    // Never let an empty scrape clobber a populated cache. Several countries
    // have a stub scraper that returns empty arrays by design, because their
    // signs come from `yarn fill-gaps` instead -- Luxembourg says exactly that
    // in its own header comment. Overwriting here deleted everything fill-gaps
    // had registered, so the two tools silently undid each other and the
    // package shipped nothing despite holding 407 SVGs on disk.
    if (count(data) === 0 && fs.existsSync(cacheFile)) {
      const cached = JSON.parse(await fs.promises.readFile(cacheFile, 'utf-8')) as typeof data;
      if (count(cached) > 0) {
        console.log(`  Scrape found 0 signs; keeping the ${count(cached)} already cached`);
        data = cached;
      }
    } else {
      await fs.promises.mkdir(dataDir, { recursive: true });
      await fs.promises.writeFile(cacheFile, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`  Cached to ${cacheFile}`);
    }
  }

  if (sourceOnly) {
    // Rebuild only signs.generated.ts. Useful when the artwork on disk is
    // already correct and just the registry is stale -- which was the case for
    // 286 signs whose real SVG had been sitting beside a `.traced.svg` since
    // June while generate-source kept picking the trace. Re-rasterising every
    // sign at five sizes to fix that would take hours for no benefit.
    console.log('Step 2/2: Generating source (skipping assets)...');
    const { generateSource } = await import('./generate-source');
    await generateSource(cc);
    return;
  }

  console.log('Step 2/3: Creating assets...');
  const { default: createAssets } = await import('./create-assets');
  await createAssets(cc, data);

  console.log('Step 3/3: Generating source...');
  const { generateSource } = await import('./generate-source');
  await generateSource(cc);
};

(async () => {
  const countries = getCountries();
  const sourceOnly = process.argv.includes('--source-only');
  // --source-only implies the scrape is reused: it never touches the network.
  const cached = sourceOnly || process.argv.includes('--cached');
  for (const cc of countries) {
    await runCountry(cc, cached, sourceOnly);
  }
  console.log('\nAll done!');
})();
