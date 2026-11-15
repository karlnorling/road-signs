/**
 * generate-docs.ts
 *
 * Generates coverage documentation in two places:
 *   1. packages/@road-signs/docs/  — standalone publishable markdown package
 *   2. apps/docs/src/content/docs/countries/{cc}.mdx — injects a ## Coverage
 *      section into each Astro Starlight country page (between marker comments)
 *
 * Usage: yarn generate-docs
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { globSync } from 'glob';

// Country metadata lives in ./lib/countries so that other generators can read
// it without executing this file's top-level generation.
import { COUNTRIES, MIRRORS } from './lib/countries';
import type { CountryMeta } from './lib/countries';

// ---------------------------------------------------------------------------
// Coverage computation
// ---------------------------------------------------------------------------

interface CategoryStats {
  scraped: number;
  withSvg: number;
}

interface CountryCoverage {
  cc: string;
  meta: CountryMeta;
  totalScraped: number;
  totalWithSvg: number;
  categories: Record<string, CategoryStats>;
}

const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const buildLocalPathTokens = (assetsRoot: string): string[] =>
  globSync(path.join(assetsRoot, '**', '*.svg'))
    .filter((f) => !/_\d+x\d+\.svg$/.test(f) && !isTraced(f))
    .map((f) =>
      f
        .replace(/\\/g, '/')
        .toLowerCase()
        .replace(/[^a-z0-9/]/g, ''),
    );

const sanitize = (s: string): string =>
  s
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

/**
 * A potrace trace is not vector artwork. `bin/trace-missing.ts` writes
 * `<code>.traced.svg` for signs with no SVG upstream, and posterize emits
 * monochrome layers, so counting those as coverage reported countries at 100%
 * while a third of their signs rendered as black blobs -- mm was 231 of 233.
 * See `yarn audit-svgs`.
 */
const isTraced = (file: string): boolean => file.endsWith('.traced.svg');

const svgExistsForCode = (code: string, pathTokens: string[], assetsRoot: string): boolean => {
  const dirs = globSync(path.join(assetsRoot, '*', sanitize(code)));
  if (dirs.some((d) => globSync(path.join(d, '*.svg')).filter((f) => !isTraced(f)).length > 0)) {
    return true;
  }
  const token = normalise(code);
  if (token.length < 2) return false;
  return pathTokens.some((p) => p.includes(token));
};

const computeCoverage = (cc: string): CountryCoverage | null => {
  if (!COUNTRIES[cc]) return null;
  const scrapedPath = path.join('data', cc, 'scraped.json');

  // Country has metadata but no scrape yet — emit a zero-coverage record so
  // the docs page still gets a `## Coverage` section that honestly says
  // "no signs scraped yet".
  if (!fs.existsSync(scrapedPath)) {
    return { cc, meta: COUNTRIES[cc], totalScraped: 0, totalWithSvg: 0, categories: {} };
  }

  const scraped: Record<string, Array<{ code: string; name: string }>> = JSON.parse(
    fs.readFileSync(scrapedPath, 'utf-8'),
  );
  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  const pathTokens = buildLocalPathTokens(assetsRoot);

  const categories: Record<string, CategoryStats> = {};
  for (const [category, signs] of Object.entries(scraped)) {
    let withSvg = 0;
    for (const sign of signs) {
      if (svgExistsForCode(sign.code, pathTokens, assetsRoot)) withSvg++;
    }
    categories[category] = { scraped: signs.length, withSvg };
  }

  const totalScraped = Object.values(categories).reduce((s, c) => s + c.scraped, 0);
  const totalWithSvg = Object.values(categories).reduce((s, c) => s + c.withSvg, 0);

  return { cc, meta: COUNTRIES[cc], totalScraped, totalWithSvg, categories };
};

// ---------------------------------------------------------------------------
// Markdown helpers
// ---------------------------------------------------------------------------

const pct = (n: number, total: number): string =>
  total === 0 ? '—' : `${Math.round((n / total) * 100)}%`;

// ---------------------------------------------------------------------------
// Coverage section body (shared between the package docs and the Astro site)
// ---------------------------------------------------------------------------

const coverageSectionBody = (cov: CountryCoverage): string => {
  const { meta, totalScraped, totalWithSvg, categories } = cov;
  const missing = totalScraped - totalWithSvg;

  const lines: string[] = [
    `## Coverage`,
    ``,
    `| Metric | Value |`,
    `| ------ | ----- |`,
    `| Signs scraped | ${totalScraped} |`,
    `| Signs with SVG | ${totalWithSvg} |`,
    `| Missing SVG | ${missing} |`,
    `| Overall | **${pct(totalWithSvg, totalScraped)}** |`,
    ``,
    `| Category | Scraped | With SVG | Missing | % |`,
    `| -------- | ------: | -------: | ------: | -: |`,
  ];

  for (const [cat, stats] of Object.entries(categories)) {
    const miss = stats.scraped - stats.withSvg;
    lines.push(
      `| \`${cat}\` | ${stats.scraped} | ${stats.withSvg} | ${miss} | ${pct(stats.withSvg, stats.scraped)} |`,
    );
  }

  lines.push(``, `**Standard:** ${meta.standard}`, ``);
  lines.push(`**SVG sources:**`, ``);
  for (const src of meta.sources) {
    lines.push(`- [${src.label}](${src.url})`);
  }

  if (meta.notes) {
    lines.push(``, `:::note`, meta.notes, `:::`);
  }

  // Link back to the full coverage package page.
  lines.push(
    ``,
    `_Coverage data is also published in the [\`@road-signs/docs\`](https://www.npmjs.com/package/@road-signs/docs) package._`,
  );

  return lines.join('\n');
};

// ---------------------------------------------------------------------------
// Per-country standalone markdown (for @road-signs/docs package)
// ---------------------------------------------------------------------------

const generateCountryDoc = (cov: CountryCoverage): string => {
  const { cc, meta, totalScraped, totalWithSvg, categories } = cov;
  const pctTotal = pct(totalWithSvg, totalScraped);
  const missing = totalScraped - totalWithSvg;

  const lines: string[] = [
    `# ${meta.name} (${cc.toUpperCase()})`,
    ``,
    `**Standard:** ${meta.standard}`,
    ``,
    `**Package:** [\`@road-signs/${cc}\`](https://www.npmjs.com/package/@road-signs/${cc})`,
    ``,
    `## SVG Coverage`,
    ``,
    `| Metric | Value |`,
    `| ------ | ----- |`,
    `| Total signs scraped | ${totalScraped} |`,
    `| Signs with SVG asset | ${totalWithSvg} |`,
    `| Missing SVG | ${missing} |`,
    `| Overall coverage | **${pctTotal}** |`,
    ``,
    `## Coverage by Category`,
    ``,
    `| Category | Scraped | With SVG | Missing | Coverage |`,
    `| -------- | ------: | -------: | ------: | -------: |`,
  ];

  for (const [cat, stats] of Object.entries(categories)) {
    const miss = stats.scraped - stats.withSvg;
    lines.push(
      `| \`${cat}\` | ${stats.scraped} | ${stats.withSvg} | ${miss} | ${pct(stats.withSvg, stats.scraped)} |`,
    );
  }

  lines.push(``, `## Sources`, ``);
  for (const src of meta.sources) {
    lines.push(`- [${src.label}](${src.url})`);
  }

  if (meta.notes) {
    lines.push(``, `## Notes`, ``, meta.notes);
  }

  return lines.join('\n') + '\n';
};

// ---------------------------------------------------------------------------
// Overview README (for @road-signs/docs package)
// ---------------------------------------------------------------------------

const generateOverview = (coverages: CountryCoverage[]): string => {
  const now = new Date().toISOString().slice(0, 10);

  const lines: string[] = [
    `# @road-signs/docs`,
    ``,
    `Coverage documentation for the [\`@road-signs/*\`](https://github.com/karlnorling/road-signs) packages.`,
    `All SVG assets are sourced from [Wikimedia Commons](https://commons.wikimedia.org/) and are in the public domain`,
    `(Creative Commons or similar open licences).`,
    ``,
    `_Last updated: ${now}_`,
    ``,
    `## Coverage Summary`,
    ``,
    `| Country | Package | Signs | SVG | Missing | Coverage |`,
    `| ------- | ------- | ----: | --: | ------: | -------: |`,
  ];

  for (const cov of coverages) {
    const { cc, meta, totalScraped, totalWithSvg } = cov;
    const miss = totalScraped - totalWithSvg;
    lines.push(
      `| [${meta.name}](./coverage/${cc}.md) | [\`@road-signs/${cc}\`](https://www.npmjs.com/package/@road-signs/${cc}) | ${totalScraped} | ${totalWithSvg} | ${miss} | ${pct(totalWithSvg, totalScraped)} |`,
    );
  }

  lines.push(
    ``,
    `## Sources`,
    ``,
    `All SVGs are sourced from Wikimedia Commons under open licences (CC BY-SA or public domain).`,
    `The US package additionally draws from the FHWA Standard Highway Signs archive (public domain).`,
    ``,
    `See the per-country pages under [coverage/](./coverage/) for detailed source links and notes.`,
    ``,
    `## Licence`,
    ``,
    `Documentation and generated data: MIT.`,
    `SVG assets: see individual Wikimedia Commons file pages for per-file licences.`,
  );

  return lines.join('\n') + '\n';
};

// ---------------------------------------------------------------------------
// Astro MDX injection
// ---------------------------------------------------------------------------

const MARKER_START = '{/* COVERAGE:START */}';
const MARKER_END = '{/* COVERAGE:END */}';
const HERO_START = '{/* HERO:START */}';
const HERO_END = '{/* HERO:END */}';
const QUICK_FACTS_START = '{/* QUICK_FACTS:START */}';
const QUICK_FACTS_END = '{/* QUICK_FACTS:END */}';
const USAGE_START = '{/* USAGE:START */}';
const USAGE_END = '{/* USAGE:END */}';

const heroBlock = (cc: string): string =>
  `${HERO_START}\n\n` +
  `import CountryHero from '../../../components/CountryHero.astro';\n\n` +
  `<CountryHero cc="${cc}" />\n\n` +
  `${HERO_END}`;

/**
 * Renders a country's Quick facts table — only shows rows that have data,
 * skips the block entirely if no field is populated.
 */
const quickFactsSectionBody = (cov: CountryCoverage): string | null => {
  const { meta } = cov;
  const driveLabel = meta.driveSide
    ? { left: 'Left-hand', right: 'Right-hand', mixed: 'Mixed' }[meta.driveSide]
    : null;

  const rows: Array<[string, string]> = [];
  if (driveLabel) rows.push(['Drive side', driveLabel]);
  if (meta.languages && meta.languages.length > 0) {
    rows.push(['Language(s)', meta.languages.join(', ')]);
  }
  if (meta.regulator) rows.push(['Regulator', meta.regulator]);
  if (meta.codePrefix) rows.push(['Code format', `\`${meta.codePrefix}\``]);
  rows.push(['Standard', meta.standard]);

  if (rows.length === 1) return null; // only the standard row → already shown in Coverage

  const lines: string[] = ['## Quick facts', '', '| Field | Value |', '| ----- | ----- |'];
  for (const [k, v] of rows) lines.push(`| ${k} | ${v} |`);
  return lines.join('\n');
};

const quickFactsBlock = (cov: CountryCoverage): string | null => {
  const body = quickFactsSectionBody(cov);
  if (!body) return null;
  return `${QUICK_FACTS_START}\n\n${body}\n\n${QUICK_FACTS_END}`;
};

interface SampleSign {
  id: string;
  code: string;
  category: string;
}

/**
 * Heuristic: does this string look like a real sign code (e.g. "W1-1",
 * "101", "A.1", "Zeichen 274") rather than a stale slug-as-code from the
 * pre-review buggy extractor (e.g. "sign-101-danger-...-the-danger")?
 *
 * The fallback path in older scrapes would slugify the description and use
 * THAT as the code, producing very long strings with English words. Real
 * codes are short, mostly digits + a short letter prefix.
 */
const looksLikeRealCode = (code: string): boolean => {
  if (code.length > 16) return false;
  if (/^\d+$/.test(code)) return true; // numeric: UK / FI / NO / JP / KR
  // Allow 1–4 letter prefix + numbers + optional letter suffix, possibly
  // with dots or dashes (W1-1, A.1, Zeichen 274's "274", etc.).
  return /^[A-Za-z]{0,4}[-. ]?\d+[\w.-]*$/.test(code);
};

/**
 * Pulls a representative sign from a country's signs.generated.ts (or its
 * shard files) so docs code-samples reference codes that actually exist.
 * Returns null for empty packages.
 *
 * Preference order:
 *   1. First entry whose `code` looks like a real sign code.
 *   2. Failing that, the very first entry (better than nothing).
 */
const extractSampleSign = (cc: string): SampleSign | null => {
  // A mirror has no registry of its own, so read the country it re-exports.
  // Without this the sample lookup returns null and the usage block falls back
  // to "example-sign" placeholders -- which is how sm.mdx regressed.
  const srcDir = path.join('packages', '@road-signs', MIRRORS[cc] ?? cc, 'src');
  const primary = path.join(srcDir, 'signs.generated.ts');
  if (!fs.existsSync(primary)) return null;

  // Build the list of source files: either the primary OR every shard.
  const sources: string[] = [];
  const primarySrc = fs.readFileSync(primary, 'utf-8');
  const shardMatches = [
    ...primarySrc.matchAll(/from\s+['"]\.\/(signs\.[a-z0-9_]+\.generated)['"]/gi),
  ];
  if (shardMatches.length > 0) {
    for (const m of shardMatches) {
      const f = path.join(srcDir, `${m[1]}.ts`);
      if (fs.existsSync(f)) sources.push(f);
    }
  } else {
    sources.push(primary);
  }

  let first: SampleSign | null = null;
  for (const f of sources) {
    const src = fs.readFileSync(f, 'utf-8');
    // Split by sign-literal closers (the closing `  },` lines we use during
    // sharding). Within each block, capture each field independently so the
    // field order doesn't matter.
    for (const blockSrc of src.split(/\n  \},\n/)) {
      const codeM = blockSrc.match(/\bcode:\s*"([^"]+)"/);
      const idM = blockSrc.match(/\bid:\s*"([^"]+)"/);
      const catM = blockSrc.match(/\bcategory:\s*"([^"]+)"/);
      if (!codeM || !idM || !catM) continue;
      const candidate: SampleSign = { id: idM[1], code: codeM[1], category: catM[1] };
      if (!first) first = candidate;
      if (looksLikeRealCode(candidate.code)) return candidate;
    }
  }
  return first;
};

/**
 * Render the Usage section's <Tabs> block, substituting real sign codes
 * when available. Falls back to neutral placeholders for empty packages.
 */
const usageSectionBody = (cc: string, sample: SampleSign | null): string => {
  const upper = cc.toUpperCase();
  const idSample = sample ? sample.id : 'example-sign';
  const codeSample = sample ? sample.code : 'EXAMPLE-CODE';
  const categorySample = sample ? sample.category : 'warning';
  const sampleComment = sample
    ? `// Example below uses the real ${upper} sign "${sample.code}" — adjust to taste.`
    : `// Placeholders — replace with real codes once @road-signs/${cc} ships a registry.`;

  return [
    '## Usage',
    '',
    '<Tabs>',
    '  <TabItem label="TypeScript">',
    '    ```ts',
    `    import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/${cc}';`,
    '',
    `    ${sampleComment}`,
    '',
    '    // All signs',
    '    signs.length;',
    '',
    '    // By slug ID',
    `    const sign = getSign("${idSample}");`,
    '',
    '    // By sign code',
    `    const s = getSignByCode("${codeSample}");`,
    '',
    `    // All ${categorySample} signs`,
    `    const filtered = getSignsByCategory("${categorySample}");`,
    '    ```',
    '  </TabItem>',
    '  <TabItem label="React">',
    '    ```tsx',
    `    import { getSignsByCategory } from '@road-signs/${cc}';`,
    "    import { RoadSign } from '@road-signs/react';",
    '',
    `    const ${categorySample}Signs = getSignsByCategory("${categorySample}");`,
    '',
    `    export default function ${cc.toUpperCase()}Grid() {`,
    '      return (',
    "        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>",
    `          {${categorySample}Signs.map((sign) => (`,
    '            <RoadSign key={sign.id} sign={sign} size={64} />',
    '          ))}',
    '        </div>',
    '      );',
    '    }',
    '    ```',
    '  </TabItem>',
    '  <TabItem label="Vue 3">',
    '    ```vue',
    '    <script setup>',
    `    import { getSignsByCategory } from '@road-signs/${cc}';`,
    "    import { RoadSign } from '@road-signs/vue';",
    '',
    `    const ${categorySample}Signs = getSignsByCategory("${categorySample}");`,
    '    </script>',
    '',
    '    <template>',
    '      <div style="display:flex;gap:8px;flex-wrap:wrap">',
    `        <RoadSign v-for="sign in ${categorySample}Signs" :key="sign.id" :sign="sign" :size="64" />`,
    '      </div>',
    '    </template>',
    '    ```',
    '  </TabItem>',
    '</Tabs>',
  ].join('\n');
};

const usageBlock = (cc: string, sample: SampleSign | null): string =>
  `${USAGE_START}\n\n${usageSectionBody(cc, sample)}\n\n${USAGE_END}`;

/**
 * Replace content between `start` and `end` markers if both are present.
 * Returns the new content and a flag indicating whether the replace happened.
 */
const replaceBetween = (
  content: string,
  start: string,
  end: string,
  replacement: string,
): { content: string; replaced: boolean } => {
  if (!content.includes(start) || !content.includes(end)) {
    return { content, replaced: false };
  }
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end);
  if (endIdx <= startIdx) return { content, replaced: false };
  const after = content.slice(endIdx + end.length);
  return {
    content: content.slice(0, startIdx) + replacement + '\n' + after.replace(/^\n*/, '\n'),
    replaced: true,
  };
};

/**
 * Inject (or replace) the hero strip just after the MDX frontmatter and any
 * initial `import { Tabs, ... }` lines. Uses HERO_START / HERO_END markers
 * so subsequent runs replace cleanly. Idempotent.
 */
const injectHeroMdx = (mdxPath: string, cc: string): void => {
  if (!fs.existsSync(mdxPath)) return;
  let content = fs.readFileSync(mdxPath, 'utf-8');
  const block = heroBlock(cc);

  const updated = replaceBetween(content, HERO_START, HERO_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: insert after the frontmatter closing `---` plus any leading
  // import lines (so the hero ends up just below the page title but above
  // the first prose paragraph).
  const fmEnd = content.indexOf('\n---\n');
  if (fmEnd === -1) return;
  let cursor = fmEnd + 5;
  // Skip blank lines and `import ...;` lines.
  const after = content.slice(cursor);
  const importMatch = after.match(/^(?:\s*\n|import\s+[^\n]*;\s*\n)+/);
  if (importMatch) cursor += importMatch[0].length;

  content = content.slice(0, cursor) + '\n' + block + '\n\n' + content.slice(cursor);
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the Usage section's <Tabs> block with one that uses a
 * real sign code from the country's registry. Idempotent. On first run,
 * wraps the existing hand-written ## Usage + <Tabs> region (located by
 * scanning for `## Usage` and the matching `</Tabs>`) so subsequent runs
 * can replace it via markers.
 */
const injectUsageMdx = (mdxPath: string, cc: string): void => {
  if (!fs.existsSync(mdxPath)) return;
  const sample = extractSampleSign(cc);
  const block = usageBlock(cc, sample);

  let content = fs.readFileSync(mdxPath, 'utf-8');

  const updated = replaceBetween(content, USAGE_START, USAGE_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: locate the existing `## Usage\n\n<Tabs>` … `</Tabs>` span and
  // replace it in-place. If we can't find one, append the block at the end
  // (before TypeScript types) — the page just gets a fresh Usage section.
  const usageHeadingIdx = content.indexOf('## Usage');
  const tabsCloseIdx = usageHeadingIdx === -1 ? -1 : content.indexOf('</Tabs>', usageHeadingIdx);
  if (usageHeadingIdx !== -1 && tabsCloseIdx !== -1) {
    const before = content.slice(0, usageHeadingIdx);
    const after = content.slice(tabsCloseIdx + '</Tabs>'.length);
    content = before + block + after;
    fs.writeFileSync(mdxPath, content, 'utf-8');
    return;
  }

  // No usage section to replace — insert before TypeScript types if present,
  // else append to end.
  const tsAnchor = '\n## TypeScript types';
  const insertAt = content.indexOf(tsAnchor);
  if (insertAt !== -1) {
    content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  } else {
    content = content.trimEnd() + '\n\n' + block + '\n';
  }
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the Quick facts block right after the HERO. Skips
 * silently if no quick-facts data is available. Idempotent.
 */
const injectQuickFactsMdx = (mdxPath: string, cov: CountryCoverage): void => {
  if (!fs.existsSync(mdxPath)) return;
  const block = quickFactsBlock(cov);

  let content = fs.readFileSync(mdxPath, 'utf-8');

  // If there's no data to show, remove any previous quick-facts block.
  if (!block) {
    const updated = replaceBetween(content, QUICK_FACTS_START, QUICK_FACTS_END, '');
    if (updated.replaced) fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  const updated = replaceBetween(content, QUICK_FACTS_START, QUICK_FACTS_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: insert after the HERO block (or after frontmatter if hero
  // hasn't been injected yet).
  let insertAt: number;
  const heroEndIdx = content.indexOf(HERO_END);
  if (heroEndIdx !== -1) {
    insertAt = heroEndIdx + HERO_END.length;
  } else {
    const fmEnd = content.indexOf('\n---\n');
    if (fmEnd === -1) return;
    insertAt = fmEnd + 5;
    const after = content.slice(insertAt);
    const importMatch = after.match(/^(?:\s*\n|import\s+[^\n]*;\s*\n)+/);
    if (importMatch) insertAt += importMatch[0].length;
  }

  content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the coverage section in a country MDX file.
 * The section is wrapped in marker comments so future runs replace it cleanly.
 * It is inserted just before `## TypeScript types` (or appended if not found).
 * Any existing hand-written `## Coverage gaps` section is replaced.
 */
const injectCoverageMdx = (mdxPath: string, cov: CountryCoverage): void => {
  if (!fs.existsSync(mdxPath)) return;

  let content = fs.readFileSync(mdxPath, 'utf-8');

  const block = `${MARKER_START}\n\n${coverageSectionBody(cov)}\n\n${MARKER_END}`;

  const updated = replaceBetween(content, MARKER_START, MARKER_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // Remove any legacy hand-written coverage sections (## Coverage gaps / ## Coverage).
  content = content.replace(/\n## Coverage[^\n]*\n[\s\S]*?(?=\n## |\s*$)/g, '\n');

  // Insert before ## TypeScript types, or append.
  const tsAnchor = '\n## TypeScript types';
  const insertAt = content.indexOf(tsAnchor);
  if (insertAt !== -1) {
    content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  } else {
    content = content.trimEnd() + '\n\n' + block + '\n';
  }

  fs.writeFileSync(mdxPath, content, 'utf-8');
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const docsDir = path.join('packages', '@road-signs', 'docs');
const coverageDir = path.join(docsDir, 'coverage');
const astroPagesDir = path.join('apps', 'docs', 'src', 'content', 'docs', 'countries');

const coverages = Object.keys(COUNTRIES)
  .map(computeCoverage)
  .filter((c): c is CountryCoverage => c !== null);

fs.mkdirSync(coverageDir, { recursive: true });

console.log('Writing @road-signs/docs package...');
for (const cov of coverages) {
  const outPath = path.join(coverageDir, `${cov.cc}.md`);
  fs.writeFileSync(outPath, generateCountryDoc(cov), 'utf-8');
  console.log(`  ${outPath}`);
}
const readmePath = path.join(docsDir, 'README.md');
fs.writeFileSync(readmePath, generateOverview(coverages), 'utf-8');
console.log(`  ${readmePath}`);

console.log('\nInjecting hero strip + coverage sections into Astro docs...');
for (const cov of coverages) {
  const mdxPath = path.join(astroPagesDir, `${cov.cc}.mdx`);
  // Skip the hero if the country has no signs at all (e.g. Lebanon).
  if (cov.totalScraped > 0) injectHeroMdx(mdxPath, cov.cc);
  injectQuickFactsMdx(mdxPath, cov);
  injectUsageMdx(mdxPath, cov.cc);
  injectCoverageMdx(mdxPath, cov);
  console.log(`  ${mdxPath}`);
}

// oxfmt pads markdown tables, so the raw output above fails
// `yarn format:check` on every run -- the generated docs README has been
// drifting from the formatter since June for exactly this reason.
execFileSync('yarn', ['oxfmt', docsDir, astroPagesDir], {
  stdio: ['ignore', 'ignore', 'inherit'],
});

console.log(`\nDone — ${coverages.length} countries documented.`);
