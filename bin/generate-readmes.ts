/**
 * generate-readmes.ts
 *
 * Writes a README.md into every publishable package.
 *
 * Every package.json already lists "README.md" in `files`, but only one
 * README existed in the repo — so 200+ npm pages would have shipped blank.
 * Country READMEs are generated from the same COUNTRIES metadata that drives
 * the docs site, plus live counts read from the registry, so they can't drift.
 *
 * Usage:  yarn generate-readmes
 */

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PACKAGES_DIR, listCountries, readRegistry } from './lib/registry';
import { COUNTRIES, MIRRORS } from './lib/countries';
import { classify } from './audit-svgs';
import type { CountryMeta } from './lib/countries';

const REPO = 'https://github.com/karlnorling/road-signs';
const DOCS = 'https://karlnorling.github.io/road-signs';

const titleCase = (cc: string): string => cc.toUpperCase();

/** A single-quoted TypeScript string literal, which is the style oxfmt emits. */
const q = (value: string): string => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const header = (name: string, description: string): string[] => [`# ${name}`, ``, description, ``];

const installBlock = (pkg: string): string[] => [
  `## Install`,
  ``,
  '```sh',
  `npm install ${pkg}`,
  '```',
  ``,
];

const footer = (pkg: string): string[] => [
  `## Links`,
  ``,
  `- [Documentation](${DOCS})`,
  `- [Source](${REPO}/tree/main/packages/${pkg})`,
  ``,
  `## License`,
  ``,
  `MIT © Karl Norling`,
  ``,
];

const countryReadme = (cc: string, meta: CountryMeta | undefined): string => {
  const pkg = `@road-signs/${cc}`;
  const U = titleCase(cc);
  const mirrorOf = MIRRORS[cc];
  const signs = readRegistry(mirrorOf ?? cc);
  const categories = [...new Set(signs.map((s) => s.category))].sort();
  // `s.svg` being set is not the same as the sign having usable artwork: a
  // potrace trace lands in that same field and renders as a black blob, so
  // counting it here is what let a README claim 100% vector coverage for a
  // country that was 231/233 traced. See `yarn audit-svgs`.
  const withSvg = signs.filter((s) => {
    const verdict = classify(s.svg, s.assetSvg);
    return verdict === 'ok' || verdict === 'mono' || verdict === 'oversized';
  }).length;
  const name = meta?.name ?? U;

  const artwork =
    withSvg === 0
      ? `with typed lookup helpers`
      : withSvg === signs.length
        ? `with every sign's artwork inlined as SVG, plus typed lookup helpers`
        : `with most signs' artwork inlined as SVG, plus typed lookup helpers`;

  const lines = header(`${pkg}`, `Road signs for ${name} — a TypeScript registry ${artwork}.`);

  if (mirrorOf) {
    const target = COUNTRIES[mirrorOf]?.name ?? mirrorOf.toUpperCase();
    lines.push(
      `> ${name} is fully integrated into ${target}'s sign system, so this package`,
      `> re-exports [\`@road-signs/${mirrorOf}\`](${REPO}/tree/main/packages/@road-signs/${mirrorOf})`,
      `> rather than shipping a duplicate catalogue. The signs below are ${target}'s.`,
      ``,
    );
  } else if (signs.length === 0) {
    lines.push(
      `> **No signs yet.** This package is scaffolded but its registry is still empty,`,
      `> so \`getAllSigns()\` returns \`[]\`. Contributions of sources are welcome —`,
      `> see [the coverage notes](${DOCS}/countries/${cc}/).`,
      ``,
    );
  }

  lines.push(...installBlock(pkg));

  if (signs.length > 0) {
    lines.push(
      `## At a glance`,
      ``,
      `| | |`,
      `| --- | --- |`,
      `| Signs | ${signs.length.toLocaleString()} |`,
      `| With vector artwork | ${withSvg.toLocaleString()} |`,
      `| Categories | ${categories.map((c) => `\`${c}\``).join(', ')} |`,
    );
    if (meta?.standard) lines.push(`| Standard | ${meta.standard} |`);
    if (meta?.regulator) lines.push(`| Regulator | ${meta.regulator} |`);
    if (meta?.driveSide) lines.push(`| Drive side | ${meta.driveSide}-hand |`);
    if (meta?.languages?.length) lines.push(`| Language(s) | ${meta.languages.join(', ')} |`);
    lines.push(``);
  }

  const example = signs.find((s) => s.svg) ?? signs[0];

  // Align the trailing comments on the longest call, rather than a fixed
  // column: some slug ids run past 40 characters and would otherwise leave the
  // comment jammed against the semicolon.
  const calls: Array<[string, string]> = [['signs;', 'the whole registry']];
  if (example) {
    calls.push(
      [`getSign(${q(example.id)});`, 'by slug id'],
      [`getSignByCode(${q(example.code)});`, 'by official code'],
    );
  }
  if (categories.length > 0) {
    calls.push([`getSignsByCategory(${q(categories[0])});`, 'by category']);
  }

  lines.push(
    `## Usage`,
    ``,
    '```ts',
    `import { signs, getSign, getSignByCode, getSignsByCategory } from '${pkg}';`,
    ``,
    ...calls.map(([call, note]) => `${call} // ${note}`),
    '```',
    ``,
  );

  if (withSvg > 0) {
    lines.push(
      `Each sign carries its own artwork, so nothing else has to be copied or served:`,
      ``,
      '```ts',
      `const sign = getSign(${q(example?.id ?? 'some-sign-id')})!;`,
      ``,
      `sign.svg; // inline, SVGO-optimised SVG markup`,
      '```',
      ``,
    );
  }

  // `assets` paths point into the repo's build-time tree, which is ~16GB across
  // all countries and excluded from `files`. Saying so matters most for the
  // signs that have no inline SVG at all: in a published package they have no
  // renderable artwork whatsoever.
  if (withSvg < signs.length) {
    const allMissing = withSvg === 0;
    lines.push(
      `> **${allMissing ? 'No' : `${signs.length - withSvg} of these`} signs carry inline artwork.**`,
      `> They have no usable vector source — either none was published upstream,`,
      `> or the only artwork is a monochrome trace that renders as a black shape.`,
      `> Vector sources for ${name} are welcome:`,
      `> see [the coverage notes](${DOCS}/countries/${cc}/).`,
      ``,
    );
  }

  if (withSvg > 0) {
    lines.push(
      `> \`sign.assets\` holds paths into this repo's build-time \`assets/\` tree.`,
      `> That directory is ~16GB across all countries and is **not published** —`,
      `> render from \`sign.svg\` instead.`,
      ``,
    );
  }

  if (meta?.sources?.length) {
    lines.push(`## Sources`, ``);
    for (const src of meta.sources) lines.push(`- [${src.label}](${src.url})`);
    lines.push(``);
  }
  if (meta?.notes) lines.push(`## Notes`, ``, meta.notes, ``);

  lines.push(...footer(pkg));
  return lines.join('\n');
};

// The usage examples name real exports only: `@road-signs/core` exports
// generic `getSign`/`getSignByCode`/`getSignsByCategory`/`getAllSigns` that take
// a registry, each country package exports the same four already bound to its
// own, and `elements` exports the `RoadSignElement` class (there is no
// `registerRoadSign` helper, despite what its own doc comment used to claim).
const FRAMEWORK: Record<string, { blurb: string; usage: (sample: string) => string[] }> = {
  core: {
    blurb:
      'Shared TypeScript types and generic lookup helpers for every `@road-signs/*` country package.',
    usage: (sample) => [
      "import { getSign, getSignsByCategory } from '@road-signs/core';",
      "import type { Sign, ViennaSign } from '@road-signs/core';",
      "import { signs } from '@road-signs/us';",
      '',
      '// The helpers are generic over any country registry.',
      `const sign = getSign(signs, ${q(sample)});`,
      "const warnings = getSignsByCategory(signs, 'warning');",
    ],
  },
  react: {
    blurb: 'Accessible React component for road signs — works with any country package.',
    usage: (sample) => [
      "import { getSign } from '@road-signs/us';",
      "import { RoadSign } from '@road-signs/react';",
      '',
      `const sign = getSign(${q(sample)})!;`,
      '',
      '<RoadSign sign={sign} size={64} />;',
    ],
  },
  vue: {
    blurb: 'Accessible Vue 3 component for road signs — works with any country package.',
    usage: (sample) => [
      "import { getSign } from '@road-signs/us';",
      "import { RoadSign } from '@road-signs/vue';",
      '',
      `const sign = getSign(${q(sample)});`,
      '',
      '// <RoadSign :sign="sign" :size="64" />',
    ],
  },
  elements: {
    blurb: 'Framework-free custom element for road signs — works with any country package.',
    usage: (sample) => [
      "import { RoadSignElement } from '@road-signs/elements';",
      "import { getSign } from '@road-signs/us';",
      '',
      "customElements.define('road-sign', RoadSignElement);",
      '',
      "const el = document.createElement('road-sign') as RoadSignElement;",
      `el.sign = getSign(${q(sample)})!; // set the sign, not an attribute`,
      "el.setAttribute('size', '64');",
      'document.body.append(el);',
    ],
  },
};

const frameworkReadme = (name: string, sample: string): string => {
  const pkg = `@road-signs/${name}`;
  const { blurb, usage } = FRAMEWORK[name];
  return [
    ...header(pkg, blurb),
    ...installBlock(pkg),
    `## Usage`,
    ``,
    '```ts',
    ...usage(sample),
    '```',
    ``,
    `Every sign renders from its country package alone — the artwork is inline`,
    `SVG, with the accessible name and description injected into it automatically.`,
    ``,
    ...footer(pkg),
  ].join('\n');
};

/**
 * A real sign id from `@road-signs/us`, for the framework examples. Read from
 * the registry rather than hardcoded: the first draft of these READMEs used
 * "w1-1-turn", which does not exist (the real id is "w1-1r-turn-right").
 */
const sampleSignId = (): string => {
  const signs = readRegistry('us');
  const sign = signs.find((s) => s.svg) ?? signs[0];
  if (!sign) throw new Error('cannot read a sample sign id from @road-signs/us');
  return sign.id;
};

const main = (): void => {
  const only = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  let written = 0;

  const sample = sampleSignId();
  const paths: string[] = [];
  const write = (pkg: string, body: string): void => {
    const file = path.join(PACKAGES_DIR, pkg, 'README.md');
    fs.writeFileSync(file, body, 'utf-8');
    paths.push(file);
    written++;
  };

  for (const name of Object.keys(FRAMEWORK)) {
    if (only) break;
    write(name, frameworkReadme(name, sample));
  }

  for (const cc of only ? [only] : listCountries()) {
    write(cc, countryReadme(cc, COUNTRIES[cc]));
  }

  // oxfmt pads markdown tables and reformats fenced code blocks, so emitting
  // raw text here would fail `yarn format:check` on every regeneration.
  execFileSync('yarn', ['oxfmt', ...paths], { stdio: ['ignore', 'ignore', 'inherit'] });

  console.log(`Wrote ${written} READMEs.`);
};

main();
