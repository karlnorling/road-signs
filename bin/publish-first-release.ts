/* oxlint-disable no-await-in-loop */

/**
 * publish-first-release.ts
 *
 * One-off helper for the very first publish of the @road-signs scope, before
 * npm trusted publishing is set up.
 *
 * Why this exists rather than CI:
 *
 *   * npm trusted publishing is configured per package, in that package's own
 *     settings on npmjs.com, and a package has to exist before those settings
 *     are reachable. With 200 brand-new packages there is nothing to configure
 *     yet, so the first publish has to come from a token.
 *   * Coverage is measured against data/{cc}/scraped.json, and data/ is
 *     gitignored. Only a machine that has run the scrapers can judge it, so
 *     this cannot run on a runner.
 *
 * It publishes with `yarn npm publish`, not `npm publish`, deliberately: every
 * country package declares `"@road-signs/core": "workspace:*"`, and only
 * Yarn's packer rewrites that to a real version. `npm publish` ships the
 * literal `workspace:*`, which consumers cannot install. (Verified with
 * `npm pack` vs `yarn pack`.)
 *
 * Coverage is the same measure `yarn verify` reports: of the signs in
 * data/{cc}/scraped.json, how many have an SVG asset on disk. The matching
 * logic below is copied from bin/verify.ts so the two agree; verify.ts is the
 * source of truth if they ever drift.
 *
 * Usage:
 *   yarn publish-first-release                     # dry run, >= 50% coverage
 *   yarn publish-first-release --min-coverage=60
 *   yarn publish-first-release --only=se,no,dk
 *   yarn publish-first-release --execute           # actually publish
 *
 * Publishing requires NPM_JS_AUTH to be set, which .yarnrc.yml reads as the
 * registry token.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

const PACKAGES_ROOT = path.join('packages', '@road-signs');
/** A country package's directory is its ISO 3166-1 alpha-2 code. */
const COUNTRY_DIR = /^[a-z]{2}$/;
const DEFAULT_MIN_COVERAGE = 50;
/** npm is unhappy with long bursts; a short gap keeps a 200-package run calm. */
const DELAY_MS = 750;

interface ScrapedSign {
  code: string;
  category: string;
}
type ScrapedData = Record<string, ScrapedSign[]>;

interface Candidate {
  cc: string;
  name: string;
  version: string;
  scraped: number;
  withSvg: number;
  coverage: number | null;
  reason?: string;
}

// --- coverage, mirroring bin/verify.ts -------------------------------------

const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const sanitize = (s: string): string =>
  s
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const buildLocalPathTokens = (assetsRoot: string): string[] =>
  globSync(path.join(assetsRoot, '**', '*.svg'))
    .filter((f) => !/_\d+x\d+\.svg$/.test(f))
    .map((f) =>
      f
        .replace(/\\/g, '/')
        .toLowerCase()
        .replace(/[^a-z0-9/]/g, ''),
    );

const svgExistsForCode = (code: string, pathTokens: string[], assetsRoot: string): boolean => {
  const dirs = globSync(path.join(assetsRoot, '*', sanitize(code)));
  if (dirs.some((d) => globSync(path.join(d, '*.svg')).length > 0)) return true;
  const token = normalise(code);
  if (token.length < 2) return false;
  return pathTokens.some((p) => p.includes(token));
};

const measure = (cc: string): Pick<Candidate, 'scraped' | 'withSvg' | 'coverage' | 'reason'> => {
  const scrapedPath = path.join('data', cc, 'scraped.json');
  if (!fs.existsSync(scrapedPath)) {
    return { scraped: 0, withSvg: 0, coverage: null, reason: 'no scraped data' };
  }
  const scraped: ScrapedData = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));
  const assetsRoot = path.join(PACKAGES_ROOT, cc, 'assets');
  const pathTokens = buildLocalPathTokens(assetsRoot);

  let total = 0;
  let withSvg = 0;
  for (const signs of Object.values(scraped)) {
    for (const sign of signs) {
      total++;
      if (svgExistsForCode(sign.code, pathTokens, assetsRoot)) withSvg++;
    }
  }
  if (total === 0) return { scraped: 0, withSvg: 0, coverage: null, reason: 'scraped data empty' };
  return { scraped: total, withSvg, coverage: (withSvg / total) * 100 };
};

// --- main ------------------------------------------------------------------

const arg = (name: string): string | undefined => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.split('=').slice(1).join('=');
};
const flag = (name: string): boolean => process.argv.includes(`--${name}`);

const minCoverage = Number(arg('min-coverage') ?? DEFAULT_MIN_COVERAGE);
const only = arg('only')
  ?.split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const execute = flag('execute');

if (Number.isNaN(minCoverage) || minCoverage < 0 || minCoverage > 100) {
  console.error(`--min-coverage must be between 0 and 100, got "${arg('min-coverage')}"`);
  process.exit(2);
}

const readManifest = (dir: string) =>
  JSON.parse(fs.readFileSync(path.join(PACKAGES_ROOT, dir, 'package.json'), 'utf-8'));

const dirs = fs
  .readdirSync(PACKAGES_ROOT)
  .filter((d) => fs.existsSync(path.join(PACKAGES_ROOT, d, 'package.json')))
  // --only still carries the shared packages, since nothing works without them.
  .filter((d) => (only ? only.includes(d) || !COUNTRY_DIR.test(d) : true))
  .sort();

// Everything that is not a two-letter country directory -- core, react, vue,
// elements, docs -- is shared infrastructure. Coverage is meaningless for
// those, and the framework wrappers are useless without them, so they ship
// regardless.
const countries: Candidate[] = [];
const infra: { cc: string; name: string; version: string }[] = [];

for (const dir of dirs) {
  const pkg = readManifest(dir);
  if (pkg.private) continue;
  if (COUNTRY_DIR.test(dir)) {
    countries.push({ cc: dir, name: pkg.name, version: pkg.version, ...measure(dir) });
  } else {
    infra.push({ cc: dir, name: pkg.name, version: pkg.version });
  }
}

const eligible = countries.filter((c) => c.coverage !== null && c.coverage >= minCoverage);
const belowBar = countries.filter((c) => c.coverage !== null && c.coverage < minCoverage);
const unknown = countries.filter((c) => c.coverage === null);

// core first: the framework wrappers and every country package declare it as a
// dependency, so it must exist on the registry before anything that needs it.
const ordered = [...infra.filter((p) => p.cc === 'core'), ...infra.filter((p) => p.cc !== 'core')];
const toPublish = [...ordered, ...eligible];

const pct = (c: Candidate) =>
  c.coverage === null ? '   —  ' : `${c.coverage.toFixed(1).padStart(5)}%`;

console.log(`Coverage threshold: ${minCoverage}%   (measured as in \`yarn verify\`)\n`);
console.log(`  ELIGIBLE (${eligible.length})`);
for (const c of eligible) console.log(`    ${c.cc.padEnd(4)} ${pct(c)}  ${c.withSvg}/${c.scraped}`);
console.log(`\n  BELOW THRESHOLD (${belowBar.length}) — not published`);
for (const c of belowBar) console.log(`    ${c.cc.padEnd(4)} ${pct(c)}  ${c.withSvg}/${c.scraped}`);
console.log(`\n  NO COVERAGE DATA (${unknown.length}) — not published`);
console.log(`    ${unknown.map((c) => c.cc).join(' ') || '(none)'}`);
console.log(`\n  SHARED PACKAGES (${infra.length}) — always published, coverage does not apply`);
for (const p of ordered) console.log(`    ${p.cc.padEnd(10)} ${p.name}@${p.version}`);
console.log(`\n  Total to publish: ${toPublish.length}\n`);

if (!execute) {
  console.log('Dry run. Re-run with --execute to publish (needs NPM_JS_AUTH).');
  process.exit(0);
}

if (!process.env.NPM_JS_AUTH) {
  console.error(
    'NPM_JS_AUTH is not set; .yarnrc.yml needs it to authenticate. Refusing to publish.',
  );
  process.exit(2);
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// Wrapped in an async IIFE, as bin/verify.ts and bin/trace-missing.ts are:
// these scripts are transpiled to CJS, where top-level await is unavailable.
void (async () => {
  let published = 0;
  let skipped = 0;
  const failed: string[] = [];

  for (const target of toPublish) {
    const dir = path.join(PACKAGES_ROOT, target.cc);
    if (!fs.existsSync(path.join(dir, 'dist'))) {
      console.error(`  ${target.name}: no dist/ — run \`yarn compile\` first`);
      failed.push(target.name);
      continue;
    }
    process.stdout.write(`  ${target.name}@${target.version} ... `);
    try {
      // --tolerate-republish makes a re-run safe after a partial failure.
      const out = execFileSync(
        'yarn',
        ['npm', 'publish', '--access', 'public', '--tolerate-republish'],
        { cwd: dir, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] },
      );
      if (/already exists|tolerate/i.test(out)) {
        console.log('already published, skipped');
        skipped++;
      } else {
        console.log('published');
        published++;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message.split('\n')[0] : String(error);
      console.log(`FAILED — ${message}`);
      failed.push(target.name);
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n${published} published, ${skipped} already present, ${failed.length} failed`);
  if (failed.length > 0) {
    console.log(`failed: ${failed.join(', ')}`);
    process.exit(1);
  }
})();
