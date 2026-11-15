/**
 * publishable.ts
 *
 * Prints the package name of every workspace package that should be published,
 * one per line. `scripts/publish.sh` consumes this rather than deciding in
 * bash, so the rule lives next to the registry reader that enforces it.
 *
 * Two kinds of package are held back:
 *
 *   - An empty registry. 64 country packages are scaffolded placeholders whose
 *     `signs.generated.ts` is an empty array. There is nothing to ship, and
 *     none of them has ever been published.
 *   - Coverage below MIN_COVERAGE, matching the bar set for the first release:
 *     only publish a country whose signs mostly have artwork. Today that
 *     excludes exactly fj, whose 176 signs are all raster-only and so render
 *     as nothing from a published package.
 *
 * Usage: yarn publishable [--verbose]
 */

import fs from 'fs';
import path from 'path';
import { PACKAGES_DIR, readRegistry } from './lib/registry';
import { MIRRORS } from './lib/countries';

/** Matches `bin/publish-first-release.ts`, which gated the first release. */
const MIN_COVERAGE = 0.5;

/** Not country packages, so the coverage rule does not apply to them. */
const SHARED = new Set(['core', 'docs', 'elements', 'react', 'vue']);

const verbose = process.argv.includes('--verbose');

const packages = fs
  .readdirSync(PACKAGES_DIR)
  .filter((entry) => fs.statSync(path.join(PACKAGES_DIR, entry)).isDirectory())
  .sort();

for (const pkg of packages) {
  const manifestPath = path.join(PACKAGES_DIR, pkg, 'package.json');
  if (!fs.existsSync(manifestPath)) continue;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as {
    name: string;
    private?: boolean;
  };
  if (manifest.private) continue;

  if (SHARED.has(pkg)) {
    console.log(manifest.name);
    continue;
  }

  // A mirror re-exports the country it points at, so judge it on that registry.
  const signs = readRegistry(MIRRORS[pkg] ?? pkg);
  if (signs.length === 0) {
    if (verbose) console.error(`skip ${manifest.name}: empty registry`);
    continue;
  }

  const coverage = signs.filter((s) => s.svg).length / signs.length;
  if (coverage < MIN_COVERAGE) {
    if (verbose) {
      console.error(
        `skip ${manifest.name}: ${Math.round(coverage * 100)}% of ${signs.length} signs have artwork`,
      );
    }
    continue;
  }

  console.log(manifest.name);
}
