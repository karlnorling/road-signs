/**
 * registry.ts
 *
 * Shared reader for the generated country registries.
 *
 * The registries are the largest thing in the repo (~330MB of TypeScript
 * literals, `@ts-nocheck`'d because the union complexity blows up tsc), so
 * every tool that needs to look at them parses the emitted source rather than
 * importing it. This module is that parser, used by `generate-search-index`,
 * `build-sprites` and `validate-registries`.
 *
 * Parsing is line-based rather than regex-over-blocks: inline SVG strings
 * routinely contain things like `code: "` inside attribute values, and the
 * emitted format is rigidly one field per line, so anchoring on the exact
 * `    <key>: ` prefix is both faster and safer.
 */

import fs from 'fs';
import path from 'path';

export const PACKAGES_DIR = path.join('packages', '@road-signs');

/** Workspaces under packages/@road-signs that aren't countries. */
const NON_COUNTRY = new Set(['core', 'react', 'vue', 'elements', 'docs']);

export interface RegistrySign {
  cc: string;
  category: string;
  code: string;
  description: string;
  id: string;
  name: string;
  /** Base64 PNG data URI — present only when `svg` is absent. */
  png?: string;
  /** Inline, SVGO-optimised SVG markup. */
  svg?: string;
}

/** Every country package directory name, sorted. Excludes framework packages. */
export const listCountries = (packagesDir: string = PACKAGES_DIR): string[] =>
  fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name) && !NON_COUNTRY.has(d.name))
    .map((d) => d.name)
    .sort();

/**
 * For a country's src directory, return every file holding sign literals.
 * Handles both the single-file layout and the sharded layout that large
 * countries (currently only IT) use, where signs.generated.ts is a re-export.
 */
export const collectSignSources = (srcDir: string): string[] => {
  const primary = path.join(srcDir, 'signs.generated.ts');
  if (!fs.existsSync(primary)) return [];
  const src = fs.readFileSync(primary, 'utf-8');
  const shardImports = [...src.matchAll(/from\s+['"]\.\/(signs\.[a-z0-9_]+\.generated)['"]/gi)];
  if (shardImports.length === 0) return [primary];
  return shardImports.map((m) => path.join(srcDir, `${m[1]}.ts`)).filter((f) => fs.existsSync(f));
};

const STRING_FIELDS = ['category', 'code', 'description', 'id', 'name', 'png', 'svg'] as const;

/** Parse one emitted source file's sign literals. */
export const parseRegistrySource = (cc: string, src: string): RegistrySign[] => {
  const out: RegistrySign[] = [];
  let rec: Record<string, string> | null = null;

  for (const rawLine of src.split('\n')) {
    if (rawLine === '  {') {
      rec = {};
      continue;
    }
    if (rec === null) continue;
    if (rawLine === '  },') {
      if (rec.id && rec.code !== undefined && rec.category) {
        out.push({
          cc,
          category: rec.category,
          code: rec.code,
          description: rec.description ?? '',
          id: rec.id,
          name: rec.name ?? '',
          png: rec.png,
          svg: rec.svg,
        });
      }
      rec = null;
      continue;
    }
    for (const field of STRING_FIELDS) {
      const prefix = `    ${field}: `;
      if (!rawLine.startsWith(prefix)) continue;
      try {
        rec[field] = JSON.parse(rawLine.slice(prefix.length).replace(/,$/, '')) as string;
      } catch {
        // A malformed literal is a generator bug; validate-registries reports it.
      }
      break;
    }
  }
  return out;
};

/** Read one country's full registry. Returns [] for packages with no registry. */
export const readRegistry = (cc: string, packagesDir: string = PACKAGES_DIR): RegistrySign[] => {
  const srcDir = path.join(packagesDir, cc, 'src');
  const signs: RegistrySign[] = [];
  for (const file of collectSignSources(srcDir)) {
    signs.push(...parseRegistrySource(cc, fs.readFileSync(file, 'utf-8')));
  }
  return signs;
};
