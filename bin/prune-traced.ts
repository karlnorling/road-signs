/**
 * prune-traced.ts
 *
 * Deletes every `*.traced.svg` that has been superseded by real artwork, along
 * with the raster derivatives generated from it.
 *
 * A trace is superseded when a genuine `.svg` sits in the same sign directory.
 * `bin/generate-source.ts` already prefers the real file when both exist, so
 * the trace contributes nothing to the registry from that point on -- it is
 * just the 16 files (1 SVG + 5 sizes x 3 formats) left behind by the run of
 * `yarn trace-missing` that predated the real artwork arriving on Commons.
 *
 * A trace that is the only SVG in its directory is left alone: it is still the
 * artwork that sign ships, however poor, until someone finds a vector for it.
 *
 * Usage:
 *   yarn prune-traced            # report what would go, delete nothing
 *   yarn prune-traced --delete   # actually delete
 */

import fs from 'fs';
import path from 'path';
import { PACKAGES_DIR } from './lib/registry';

const RASTER_SIZE = /_\d+x\d+\.(?:jpg|png|webp|svg)$/;

/** True for a file that is real artwork rather than a trace or a derivative. */
const isRealArtwork = (file: string): boolean =>
  file.endsWith('.svg') && !file.includes('.traced') && !RASTER_SIZE.test(file);

interface Superseded {
  /** Directory holding both the trace and the real artwork. */
  dir: string;
  /** The trace itself, plus every raster derived from it. */
  files: string[];
  /** The real SVG that supersedes it, for the report. */
  replacement: string;
}

const findSuperseded = (): Superseded[] => {
  const found: Superseded[] = [];

  const walk = (dir: string): void => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);
    const traces = files.filter((f) => f.endsWith('.traced.svg'));
    const real = files.filter(isRealArtwork);

    if (traces.length > 0 && real.length > 0) {
      for (const trace of traces) {
        // `x.traced.svg` -> `x.traced`, which also prefixes `x.traced_240x240.png`.
        const stem = trace.slice(0, -'.svg'.length);
        found.push({
          dir,
          files: files.filter((f) => f.startsWith(stem)),
          replacement: real[0],
        });
      }
    }

    for (const entry of entries) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name));
    }
  };

  for (const pkg of fs.readdirSync(PACKAGES_DIR).sort()) {
    const assets = path.join(PACKAGES_DIR, pkg, 'assets');
    if (fs.existsSync(assets)) walk(assets);
  }

  return found;
};

const main = (): void => {
  const doDelete = process.argv.includes('--delete');
  const superseded = findSuperseded();

  let bytes = 0;
  let fileCount = 0;
  const perCountry = new Map<string, number>();

  for (const entry of superseded) {
    const cc = path.relative(PACKAGES_DIR, entry.dir).split(path.sep)[0];
    perCountry.set(cc, (perCountry.get(cc) ?? 0) + 1);
    for (const file of entry.files) {
      const full = path.join(entry.dir, file);
      bytes += fs.statSync(full).size;
      fileCount++;
      if (doDelete) fs.unlinkSync(full);
    }
  }

  for (const [cc, count] of [...perCountry].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cc.padEnd(5)} ${count}`);
  }

  const verb = doDelete ? 'Deleted' : 'Would delete';
  console.log(
    `\n${verb} ${superseded.length} superseded traces ` +
      `(${fileCount} files, ${(bytes / 1024 / 1024).toFixed(1)} MB) ` +
      `across ${perCountry.size} countries.`,
  );
  if (!doDelete && superseded.length > 0) console.log('Re-run with --delete to remove them.');
};

if (process.argv[1]?.endsWith('prune-traced.ts')) main();
