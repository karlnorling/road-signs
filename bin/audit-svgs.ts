/**
 * audit-svgs.ts
 *
 * Classifies every sign's artwork so the broken ones can be found and re-fetched.
 *
 * The problem this exists for: `bin/trace-missing.ts` fills gaps by running the
 * source raster through potrace. Its own comment claims posterize "produces a
 * layered, multi-colour vector approximation", but it does not — posterize
 * emits monochrome layers at varying `fill-opacity`, so every traced sign
 * renders as a black-and-grey blob. It also writes `<rect fill="#fff"/>` with
 * no width or height, so the white background paints nothing. Those two marks
 * together identify a traced sign with near-certainty.
 *
 * Because the registry stores a traced sign in the same `svg` field as a real
 * one, coverage counts them as vector artwork. That is why a country can report
 * 100% coverage while a chunk of it renders black.
 *
 * Categories:
 *   missing    no `svg` at all -- nothing to render from a published package
 *   traced     potrace output, paints no colour: definitively wrong
 *   partial    potrace output that does paint some colour: suspect
 *   mono       real SVG that paints no colour. Usually correct by design
 *              (direction plates, stop lines), so reported but not counted bad
 *   ok         real SVG that paints colour
 *
 * Usage:
 *   yarn audit-svgs                 # per-country table, worst first
 *   yarn audit-svgs --country=kr    # one country, listing every bad sign
 *   yarn audit-svgs --json          # machine-readable, for the re-fetch step
 */

import { listCountries, readRegistry } from './lib/registry';
import { MIRRORS } from './lib/countries';

export type Verdict = 'missing' | 'oversized' | 'traced' | 'partial' | 'mono' | 'ok';

/**
 * Every colour the SVG actually paints with. Colour lives in an attribute
 * (`fill="#ce252c"`, as se does) or an inline style (`style="fill:#fff"`, as de
 * does), so both have to be read -- checking only attributes misreports 24,000
 * perfectly good signs as colourless.
 *
 * White and `none` are excluded: they are the sign's background, not artwork.
 */
export const paintedColours = (svg: string): Set<string> => {
  const out = new Set<string>();
  const add = (raw: string): void => {
    const colour = raw.trim().toLowerCase();
    if (!colour || colour === 'none' || colour === 'currentcolor' || colour === 'transparent')
      return;
    if (/^#fff(fff)?$|^white$/.test(colour)) return;
    out.add(colour);
  };
  for (const m of svg.matchAll(/\b(?:fill|stroke)\s*=\s*"([^"]*)"/gi)) add(m[1]);
  for (const m of svg.matchAll(/\b(?:fill|stroke)\s*:\s*([^;"')]+)/gi)) add(m[1]);
  for (const m of svg.matchAll(/stop-color\s*[:=]\s*"?([^;"')]+)/gi)) add(m[1]);
  return out;
};

/** The potrace-posterize fingerprint. */
export const looksTraced = (svg: string): boolean =>
  /<rect fill="#fff"\s*\/>/.test(svg) || /fill-opacity="\.\d+"/.test(svg);

/**
 * Judges one sign's artwork.
 *
 * `assetSvg` distinguishes the two reasons an entry can lack inline markup: no
 * artwork was ever found (`missing`), or the artwork exists on disk but was
 * over `MAX_INLINE_SVG_BYTES` so only its path shipped (`oversized`). Without
 * that second argument an oversized sign reads as missing, which would have
 * quietly dropped five Italian signs out of the coverage numbers.
 */
export const classify = (svg: string | undefined, assetSvg?: string): Verdict => {
  if (!svg) {
    if (!assetSvg) return 'missing';
    // A trace that happened to exceed the inline cap is still a trace, not
    // artwork. Ten of them (kr 6, my 3, nz 1) slipped into `oversized` and so
    // counted toward coverage until this check was added.
    return assetSvg.includes('.traced.svg') ? 'traced' : 'oversized';
  }
  const traced = looksTraced(svg);
  const colours = paintedColours(svg);
  if (traced) return colours.size === 0 ? 'traced' : 'partial';
  return colours.size === 0 ? 'mono' : 'ok';
};

export interface CountryAudit {
  cc: string;
  total: number;
  counts: Record<Verdict, number>;
  bad: Array<{ id: string; code: string; verdict: Verdict }>;
}

export const auditCountry = (cc: string): CountryAudit => {
  const signs = readRegistry(MIRRORS[cc] ?? cc);
  const counts: Record<Verdict, number> = {
    missing: 0,
    oversized: 0,
    traced: 0,
    partial: 0,
    mono: 0,
    ok: 0,
  };
  const bad: CountryAudit['bad'] = [];
  for (const sign of signs) {
    const verdict = classify(sign.svg, sign.assetSvg);
    counts[verdict]++;
    if (verdict === 'missing' || verdict === 'traced' || verdict === 'partial') {
      bad.push({ id: sign.id, code: sign.code, verdict });
    }
  }
  return { cc, total: signs.length, counts, bad };
};

const main = (): void => {
  const only = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  const asJson = process.argv.includes('--json');

  const audits = (only ? [only] : listCountries()).map(auditCountry).filter((a) => a.total > 0);

  if (asJson) {
    console.log(JSON.stringify(audits, null, 2));
    return;
  }

  const broken = (a: CountryAudit): number => a.counts.missing + a.counts.traced + a.counts.partial;

  if (only) {
    const a = audits[0];
    if (!a) {
      console.error(`no signs for ${only}`);
      process.exit(1);
    }
    console.log(`${a.cc}: ${a.total} signs — ${broken(a)} need artwork`);
    console.log(
      `  ok ${a.counts.ok}  mono ${a.counts.mono}  traced ${a.counts.traced}` +
        `  partial ${a.counts.partial}  missing ${a.counts.missing}`,
    );
    for (const b of a.bad) console.log(`  ${b.verdict.padEnd(8)} ${b.code}  ${b.id}`);
    return;
  }

  const affected = audits.filter((a) => broken(a) > 0).sort((x, y) => broken(y) - broken(x));

  console.log('cc    signs   bad   traced  partial  missing');
  for (const a of affected) {
    console.log(
      `${a.cc.padEnd(4)} ${String(a.total).padStart(6)} ${String(broken(a)).padStart(5)} ` +
        `${String(a.counts.traced).padStart(8)} ${String(a.counts.partial).padStart(8)} ` +
        `${String(a.counts.missing).padStart(8)}`,
    );
  }

  const sum = (pick: (a: CountryAudit) => number): number =>
    audits.reduce((n, a) => n + pick(a), 0);

  console.log();
  console.log(`${affected.length} of ${audits.length} countries affected`);
  console.log(
    `${sum(broken)} signs need artwork: ${sum((a) => a.counts.traced)} traced, ` +
      `${sum((a) => a.counts.partial)} partial, ${sum((a) => a.counts.missing)} missing`,
  );
  console.log(
    `${sum((a) => a.counts.ok)} fine, ${sum((a) => a.counts.mono)} intentionally monochrome`,
  );
};

// Only run when invoked directly. Importing this module must not print a
// report -- the same trap generate-docs had, where importing its metadata
// regenerated the whole docs site.
if (process.argv[1]?.endsWith('audit-svgs.ts')) {
  main();
}
