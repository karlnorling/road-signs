/**
 * validate-categories.ts
 *
 * For every country package, asserts that every sign's `category` field is in
 * the country's declared `<CC>Category` union. Catches scraper drift — e.g.
 * a Vienna-factory scraper that produces "regulatory" for a country whose
 * declared union is the 5-value Vienna set.
 *
 * Usage:  yarn validate-categories
 * Exits non-zero on any mismatch; intended for CI / pre-push.
 */

import fs from 'fs';
import path from 'path';

const PACKAGES_DIR = path.join('packages', '@road-signs');

/**
 * Parse the union members from a types.ts of the form:
 *   export type { ViennaCategory as ITCategory, ... } from '@road-signs/core';
 * or:
 *   export type FOOCategory = 'a' | 'b' | 'c';
 *
 * Returns the set of allowed strings, or null if the union couldn't be parsed
 * (in which case the package is skipped, not failed).
 */
const parseAllowedCategories = (typesPath: string, cc: string): Set<string> | null => {
  if (!fs.existsSync(typesPath)) return null;
  const src = fs.readFileSync(typesPath, 'utf-8');
  const upper = cc.toUpperCase();

  // Case 1: re-export of a shared alias (ViennaCategory, etc.).
  const reexport = src.match(
    new RegExp(`export\\s+type\\s*{[^}]*\\b(\\w+)\\s+as\\s+${upper}Category[^}]*}\\s*from`, 'm'),
  );
  if (reexport) {
    const aliasName = reexport[1];
    if (aliasName === 'ViennaCategory') {
      return new Set(['information', 'mandatory', 'priority', 'prohibitory', 'warning']);
    }
    // Resolve transitively against another package's types.ts.
    const fromMatch = src.match(/from\s+['"]@road-signs\/(\w+)['"]/);
    if (fromMatch) {
      const otherCc = fromMatch[1];
      const otherTypes = path.join(PACKAGES_DIR, otherCc, 'src', 'types.ts');
      return parseAllowedCategories(otherTypes, otherCc);
    }
    return null;
  }

  // Case 2: inline union, possibly multi-line.
  // Match `export type FOOCategory = 'a' | 'b';` allowing newlines and whitespace.
  const inline = src.match(
    new RegExp(
      `export\\s+type\\s+${upper}Category\\s*=\\s*((?:\\s*\\|?\\s*['"][^'"]+['"])+)\\s*;`,
      'm',
    ),
  );
  if (inline) {
    const literals = inline[1].match(/['"]([^'"]+)['"]/g);
    if (literals) return new Set(literals.map((s) => s.slice(1, -1)));
  }
  return null;
};

interface ShardImport {
  shardName: string;
  filePath: string;
}

/**
 * For a sharded `signs.generated.ts`, follow the imports to the individual
 * shard files and read those. For a non-sharded file, just return [filePath].
 */
const collectSignSources = (signsPath: string, srcDir: string): string[] => {
  if (!fs.existsSync(signsPath)) return [];
  const src = fs.readFileSync(signsPath, 'utf-8');
  // If this is a shard manifest (`import { signs_X } from './signs.X.generated';`), follow them.
  const shardImports: ShardImport[] = [];
  for (const m of src.matchAll(/from\s+['"]\.\/(signs\.[a-z0-9_]+\.generated)['"]/gi)) {
    shardImports.push({ shardName: m[1], filePath: path.join(srcDir, `${m[1]}.ts`) });
  }
  if (shardImports.length > 0) return shardImports.map((s) => s.filePath).filter(fs.existsSync);
  return [signsPath];
};

/**
 * Extract each sign's `category` field from a generated TS source.
 * The format is rigid (we generated it ourselves) so a regex is enough.
 */
const extractCategories = (signsSrc: string): string[] => {
  return [...signsSrc.matchAll(/^\s*category:\s*"([^"]+)"/gm)].map((m) => m[1]);
};

interface CountryResult {
  cc: string;
  allowed: Set<string> | null;
  mismatches: Map<string, number>; // unexpected category → count
  totalSigns: number;
}

const checkCountry = (cc: string): CountryResult => {
  const pkgDir = path.join(PACKAGES_DIR, cc);
  const srcDir = path.join(pkgDir, 'src');
  const typesPath = path.join(srcDir, 'types.ts');
  const signsPath = path.join(srcDir, 'signs.generated.ts');

  const allowed = parseAllowedCategories(typesPath, cc);
  const mismatches = new Map<string, number>();

  let totalSigns = 0;
  for (const shardPath of collectSignSources(signsPath, srcDir)) {
    const src = fs.readFileSync(shardPath, 'utf-8');
    for (const cat of extractCategories(src)) {
      totalSigns++;
      if (allowed && !allowed.has(cat)) {
        mismatches.set(cat, (mismatches.get(cat) ?? 0) + 1);
      }
    }
  }

  return { cc, allowed, mismatches, totalSigns };
};

const main = (): void => {
  if (!fs.existsSync(PACKAGES_DIR)) {
    console.error(`Missing ${PACKAGES_DIR} — run from repo root.`);
    process.exit(1);
  }

  const countries = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name))
    .map((d) => d.name)
    .sort();

  let failed = 0;
  let skipped = 0;
  let totalChecked = 0;

  for (const cc of countries) {
    const result = checkCountry(cc);
    if (result.allowed === null) {
      skipped++;
      console.warn(`  SKIP  ${cc.toUpperCase()} — could not parse category union from types.ts`);
      continue;
    }
    if (result.mismatches.size > 0) {
      failed++;
      const detail = [...result.mismatches].map(([c, n]) => `"${c}" ×${n}`).join(', ');
      const allowedList = [...result.allowed].sort().join(' | ');
      console.error(
        `  FAIL  ${cc.toUpperCase()} — unexpected categories: ${detail}\n` +
          `        declared: ${allowedList}`,
      );
    }
    totalChecked++;
  }

  console.log(`\nChecked ${totalChecked} countries (${skipped} skipped). ${failed} failed.`);
  if (failed > 0) process.exit(1);
};

main();
