/**
 * validate-registries.ts
 *
 * Structural validation of the generated country registries, plus a
 * consistency check across the hand-maintained country lists.
 *
 * Why this exists: 157 of the generated registries carry `@ts-nocheck`
 * (1000+ object literals exceed TypeScript's union complexity limit), so
 * `yarn type-check` only ever sees each package's ~20 hand-written lines.
 * The registry *is* the package, so without this script the shipped payload
 * is entirely unverified. This restores the checks tsc would have done, plus
 * the invariants tsc could never express — ID uniqueness, ID derivation, and
 * every sign having artwork that actually ships.
 *
 * Usage:  yarn validate-registries
 * Exits non-zero on any error; warnings are reported but don't fail.
 */

import fs from 'fs';
import path from 'path';
import { PACKAGES_DIR, listCountries, readRegistry } from './lib/registry';
import { makeId } from './generate-source';

const DOCS = path.join('apps', 'docs');

/**
 * Countries that intentionally ship no registry of their own because they
 * re-export another country's catalogue wholesale.
 */
const MIRRORS: Record<string, string> = { sm: 'it', va: 'it' };

const errors: string[] = [];
const warnings: string[] = [];

const err = (msg: string): void => {
  errors.push(msg);
};
const warn = (msg: string): void => {
  warnings.push(msg);
};

/** Per-sign structural checks: the invariants the published payload relies on. */
const validateRegistries = (countries: string[]): { signs: number; empty: string[] } => {
  let signs = 0;
  const empty: string[] = [];

  for (const cc of countries) {
    const registry = readRegistry(cc);
    if (registry.length === 0) {
      if (!MIRRORS[cc]) empty.push(cc);
      continue;
    }
    signs += registry.length;

    const seen = new Map<string, string>();
    for (const sign of registry) {
      const where = `${cc}/${sign.id || '<no id>'}`;

      if (!sign.id) err(`${cc}: sign with code ${JSON.stringify(sign.code)} has an empty id`);
      if (!sign.code) err(`${where}: empty code`);
      if (!sign.name) err(`${where}: empty name`);
      if (!sign.category) err(`${where}: empty category`);

      // Every sign must carry artwork that ships inside the package. assets/
      // is a build-time tree and is excluded from `files`, so a sign with
      // neither `svg` nor `png` renders as nothing for consumers.
      if (!sign.svg && !sign.png) err(`${where}: no inline svg and no png data URI`);
      if (sign.png && !sign.png.startsWith('data:image/png;base64,')) {
        err(`${where}: png is not a base64 data URI`);
      }
      if (sign.svg && !/^\s*<svg\b/.test(sign.svg)) err(`${where}: svg does not start with <svg`);

      // IDs are the package's public lookup key — duplicates make getSign()
      // silently return whichever sign Array.find reaches first.
      const prev = seen.get(sign.id);
      if (prev !== undefined) {
        err(`${cc}: duplicate id ${JSON.stringify(sign.id)} (codes ${prev} and ${sign.code})`);
      } else {
        seen.set(sign.id, sign.code);
      }

      // The id must be derivable from code+name, allowing the `-2`, `-3`
      // suffix the generator appends to break a collision.
      const expected = makeId(sign.code, sign.name);
      if (sign.id !== expected && !new RegExp(`^${escapeRe(expected)}-\\d+$`).test(sign.id)) {
        err(`${where}: id does not match makeId(code, name) = ${JSON.stringify(expected)}`);
      }
    }
  }
  return { signs, empty };
};

const escapeRe = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const readFile = (p: string): string => (fs.existsSync(p) ? fs.readFileSync(p, 'utf-8') : '');

const listDir = (p: string): string[] =>
  fs.existsSync(p)
    ? fs
        .readdirSync(p)
        .map((f) => f.replace(/\.mdx$/, ''))
        .sort()
    : [];

/**
 * The same country list is maintained by hand in five places. Nothing has
 * enforced that they agree; a country present in one and missing from another
 * has already caused an Astro build crash on main.
 */
const validateCountryLists = (packages: string[]): void => {
  const astro = readFile(path.join(DOCS, 'astro.config.mjs'));

  const codesBlock = astro.match(/const countryCodes = \[([\s\S]*?)\];/)?.[1] ?? '';
  const astroCodes = [...codesBlock.matchAll(/'([a-z]{2})'/g)]
    .map((m) => m[1])
    .filter((c) => c !== 'core');
  const sidebar = [...astro.matchAll(/slug: 'countries\/([a-z]{2})'/g)].map((m) => m[1]);

  const docsSrc = path.join(DOCS, 'src', 'content', 'docs');
  const lists: Array<[string, string[]]> = [
    ['astro.config.mjs countryCodes', [...new Set(astroCodes)].sort()],
    ['astro.config.mjs sidebar', [...new Set(sidebar)].sort()],
    ['content/docs/countries/*.mdx', listDir(path.join(docsSrc, 'countries'))],
    ['content/docs/gallery/*.mdx', listDir(path.join(docsSrc, 'gallery'))],
    ['generate-docs.ts COUNTRIES', parseCountriesMap()],
  ];

  const expected = new Set(packages);
  for (const [label, list] of lists) {
    const got = new Set(list);
    const missing = [...expected].filter((c) => !got.has(c));
    const extra = [...got].filter((c) => !expected.has(c));
    if (missing.length > 0) err(`${label}: missing ${missing.join(', ')}`);
    if (extra.length > 0) err(`${label}: has no matching package — ${extra.join(', ')}`);
  }
};

/** Top-level two-letter keys of the COUNTRIES map in generate-docs.ts. */
const parseCountriesMap = (): string[] => {
  const src = readFile(path.join('bin', 'generate-docs.ts'));
  const start = src.indexOf('const COUNTRIES: Record<string, CountryMeta> = {');
  if (start === -1) return [];
  return [...src.slice(start).matchAll(/^ {2}([a-z]{2}): \{$/gm)].map((m) => m[1]).sort();
};

const main = (): void => {
  if (!fs.existsSync(PACKAGES_DIR)) {
    console.error(`Missing ${PACKAGES_DIR} — run from repo root.`);
    process.exit(1);
  }

  const countries = listCountries();
  const { signs, empty } = validateRegistries(countries);
  validateCountryLists(countries);

  if (empty.length > 0) {
    warn(
      `${empty.length} country packages ship an empty registry — they resolve to ` +
        `getAllSigns() === [] for consumers: ${empty.join(', ')}`,
    );
  }
  for (const [cc, source] of Object.entries(MIRRORS)) {
    if (readRegistry(cc).length === 0 && readRegistry(source).length === 0) {
      err(`${cc} mirrors ${source}, but ${source} has no registry either`);
    }
  }

  for (const w of warnings) console.warn(`  warning: ${w}`);
  for (const e of errors.slice(0, 50)) console.error(`  error: ${e}`);
  if (errors.length > 50) console.error(`  … and ${errors.length - 50} more errors`);

  console.log(
    `\nChecked ${signs.toLocaleString()} signs across ` +
      `${countries.length - empty.length - Object.keys(MIRRORS).length} non-empty registries ` +
      `(${empty.length} empty, ${Object.keys(MIRRORS).length} mirrors). ` +
      `${errors.length} errors, ${warnings.length} warnings.`,
  );
  if (errors.length > 0) process.exit(1);
};

main();
