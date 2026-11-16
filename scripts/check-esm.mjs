// Loads every package's ESM and CommonJS builds in Node, the way a consumer would.
// Catches imports that only resolve in a bundler, such as relative imports without
// a file extension. Run after `yarn compile`.
import { readdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

// Web components extend HTMLElement, which Node doesn't have. A stub is enough to load them.
globalThis.HTMLElement ??= class {};

const root = new URL('../packages/@road-signs/', import.meta.url);
const require = createRequire(import.meta.url);

const manifests = await Promise.all(
  (await readdir(root)).map(async (dir) =>
    JSON.parse(await readFile(new URL(`${dir}/package.json`, root), 'utf8')),
  ),
);
const checks = manifests
  .filter((manifest) => manifest.exports?.['.']?.import)
  .flatMap(({ name }) => [
    ['import', name, () => import(name)],
    ['require', name, async () => require(name)],
  ]);

const results = await Promise.all(
  checks.map(async ([kind, name, load]) => {
    try {
      const count = Object.keys(await load()).length;
      if (count === 0) throw new Error('no exports');
      return { ok: true, line: `ok   ${name} (${kind}, ${count} exports)` };
    } catch (error) {
      return { ok: false, line: `FAIL ${name} (${kind}): ${error.message}` };
    }
  }),
);
for (const { ok, line } of results) (ok ? console.log : console.error)(line);
process.exit(results.every((r) => r.ok) ? 0 : 1);
