/**
 * probe-commons.ts
 *
 * For each empty country package, queries the Wikimedia Commons API for any
 * road-sign category that might contain SVGs. Outputs a summary table so we
 * can decide which countries to wire up a scraper for.
 *
 * Categories probed per country (in priority order):
 *   - SVG_road_signs_in_<Country>
 *   - Road_signs_in_<Country>
 *   - SVG_warning_road_signs_of_<Country>
 *   - SVG_regulatory_road_signs_of_<Country>
 *
 * Where the Country slug in the URL uses underscores and (often) "the_" for
 * "the Democratic Republic of the Congo" etc.
 *
 * Usage: yarn tsx bin/probe-commons.ts
 */

import https from 'https';

const FETCH_TIMEOUT_MS = 30_000;
const USER_AGENT = 'road-signs/0.0.0 (https://github.com/karlnorling/road-signs; commons-probe)';

const fetchJson = (url: string): Promise<any> =>
  new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': USER_AGENT }, timeout: FETCH_TIMEOUT_MS },
      (res) => {
        let body = '';
        res.setEncoding('utf-8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      },
    );
    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', reject);
  });

const countCategoryFiles = async (categoryName: string): Promise<number> => {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers` +
    `&cmtitle=Category:${encodeURIComponent(categoryName)}&cmtype=file&cmlimit=500&format=json`;
  try {
    const json = (await fetchJson(url)) as {
      query?: { categorymembers: Array<{ title: string }> };
    };
    const files = json.query?.categorymembers ?? [];
    return files.filter((f) => f.title.toLowerCase().endsWith('.svg')).length;
  } catch (err) {
    return -1; // error sentinel
  }
};

interface CountryProbe {
  cc: string;
  name: string;
  slug: string;
}

// Each entry: cc, display name, Commons URL slug (with underscores, "the_"
// where needed, etc.). Curated from prior knowledge of how Commons names
// these categories.
const COUNTRIES: CountryProbe[] = [
  { cc: 'af', name: 'Afghanistan', slug: 'Afghanistan' },
  { cc: 'bf', name: 'Burkina Faso', slug: 'Burkina_Faso' },
  { cc: 'bh', name: 'Bahrain', slug: 'Bahrain' },
  { cc: 'bi', name: 'Burundi', slug: 'Burundi' },
  { cc: 'bj', name: 'Benin', slug: 'Benin' },
  { cc: 'bt', name: 'Bhutan', slug: 'Bhutan' },
  { cc: 'cd', name: 'DR Congo', slug: 'the_Democratic_Republic_of_the_Congo' },
  { cc: 'cf', name: 'Central African Republic', slug: 'the_Central_African_Republic' },
  { cc: 'cg', name: 'Republic of the Congo', slug: 'the_Republic_of_the_Congo' },
  { cc: 'cv', name: 'Cape Verde', slug: 'Cape_Verde' },
  { cc: 'dj', name: 'Djibouti', slug: 'Djibouti' },
  { cc: 'er', name: 'Eritrea', slug: 'Eritrea' },
  { cc: 'fm', name: 'Micronesia', slug: 'the_Federated_States_of_Micronesia' },
  { cc: 'ga', name: 'Gabon', slug: 'Gabon' },
  { cc: 'gm', name: 'Gambia', slug: 'the_Gambia' },
  { cc: 'gn', name: 'Guinea', slug: 'Guinea' },
  { cc: 'gq', name: 'Equatorial Guinea', slug: 'Equatorial_Guinea' },
  { cc: 'gw', name: 'Guinea-Bissau', slug: 'Guinea-Bissau' },
  { cc: 'ki', name: 'Kiribati', slug: 'Kiribati' },
  { cc: 'km', name: 'Comoros', slug: 'the_Comoros' },
  { cc: 'lr', name: 'Liberia', slug: 'Liberia' },
  { cc: 'mh', name: 'Marshall Islands', slug: 'the_Marshall_Islands' },
  { cc: 'ml', name: 'Mali', slug: 'Mali' },
  { cc: 'mr', name: 'Mauritania', slug: 'Mauritania' },
  { cc: 'mv', name: 'Maldives', slug: 'the_Maldives' },
  { cc: 'ne', name: 'Niger', slug: 'Niger' },
  { cc: 'nr', name: 'Nauru', slug: 'Nauru' },
  { cc: 'ps', name: 'Palestine', slug: 'the_Palestinian_territories' },
  { cc: 'pw', name: 'Palau', slug: 'Palau' },
  { cc: 'sb', name: 'Solomon Islands', slug: 'the_Solomon_Islands' },
  { cc: 'sc', name: 'Seychelles', slug: 'Seychelles' },
  { cc: 'sd', name: 'Sudan', slug: 'Sudan' },
  { cc: 'sl', name: 'Sierra Leone', slug: 'Sierra_Leone' },
  { cc: 'so', name: 'Somalia', slug: 'Somalia' },
  { cc: 'ss', name: 'South Sudan', slug: 'South_Sudan' },
  { cc: 'st', name: 'São Tomé and Príncipe', slug: 'São_Tomé_and_Príncipe' },
  { cc: 'td', name: 'Chad', slug: 'Chad' },
  { cc: 'tg', name: 'Togo', slug: 'Togo' },
  { cc: 'tl', name: 'Timor-Leste', slug: 'East_Timor' },
  { cc: 'to', name: 'Tonga', slug: 'Tonga' },
  { cc: 'tv', name: 'Tuvalu', slug: 'Tuvalu' },
  { cc: 'vu', name: 'Vanuatu', slug: 'Vanuatu' },
  { cc: 'ws', name: 'Samoa', slug: 'Samoa' },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const main = async () => {
  console.log('cc  | name                          | svg | road | warn | regs | total');
  console.log('----|-------------------------------|-----|------|------|------|-------');
  const promising: Array<{ cc: string; total: number }> = [];

  for (const c of COUNTRIES) {
    const svg = await countCategoryFiles(`SVG_road_signs_in_${c.slug}`);
    await sleep(250);
    const road = await countCategoryFiles(`Road_signs_in_${c.slug}`);
    await sleep(250);
    const warn = await countCategoryFiles(`SVG_warning_road_signs_of_${c.slug}`);
    await sleep(250);
    const regs = await countCategoryFiles(`SVG_regulatory_road_signs_of_${c.slug}`);
    await sleep(250);

    const total = [svg, road, warn, regs].filter((n) => n > 0).reduce((s, n) => s + n, 0);
    const fmt = (n: number) => (n < 0 ? 'err' : String(n));
    console.log(
      `${c.cc}  | ${c.name.padEnd(29)} | ${fmt(svg).padStart(3)} | ${fmt(road).padStart(4)} | ${fmt(warn).padStart(4)} | ${fmt(regs).padStart(4)} | ${String(total).padStart(5)}`,
    );

    if (total >= 3) promising.push({ cc: c.cc, total });
  }

  console.log('\n=== Promising countries (>= 3 SVGs across queried categories) ===');
  for (const p of promising.sort((a, b) => b.total - a.total)) {
    console.log(`  ${p.cc.toUpperCase().padEnd(3)} — ${p.total} SVGs`);
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
