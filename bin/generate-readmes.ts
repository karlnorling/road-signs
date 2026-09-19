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

import fs from 'fs';
import path from 'path';
import { PACKAGES_DIR, listCountries, readRegistry } from './lib/registry';
import { COUNTRIES } from './generate-docs';
import type { CountryMeta } from './generate-docs';

const REPO = 'https://github.com/karlnorling/road-signs';
const DOCS = 'https://karlnorling.github.io/road-signs';

/** Countries that re-export another country's catalogue wholesale. */
const MIRRORS: Record<string, string> = { sm: 'it', va: 'it' };

const titleCase = (cc: string): string => cc.toUpperCase();

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
  const signs = readRegistry(cc);
  const mirrorOf = MIRRORS[cc];
  const categories = [...new Set(signs.map((s) => s.category))].sort();
  const withSvg = signs.filter((s) => s.svg).length;
  const name = meta?.name ?? U;

  const lines = header(
    `${pkg}`,
    `Road signs for ${name} — a TypeScript registry with every sign's artwork inlined, ` +
      `plus an SVG symbol sheet and a CSS sprite.`,
  );

  if (mirrorOf) {
    lines.push(
      `> ${name} uses the ${COUNTRIES[mirrorOf]?.name ?? mirrorOf.toUpperCase()} sign system, so this`,
      `> package re-exports [\`@road-signs/${mirrorOf}\`](${REPO}/tree/main/packages/@road-signs/${mirrorOf})`,
      `> rather than duplicating its catalogue.`,
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
  lines.push(
    `## Usage`,
    ``,
    '```ts',
    `import { signs, getSign, getSignByCode, getSignsByCategory } from '${pkg}';`,
    ``,
    `signs;                                  // the whole registry`,
  );
  if (example) {
    lines.push(
      `getSign(${JSON.stringify(example.id)});`.padEnd(40) + `// by slug id`,
      `getSignByCode(${JSON.stringify(example.code)});`.padEnd(40) + `// by official code`,
    );
  }
  if (categories.length > 0) {
    lines.push(
      `getSignsByCategory(${JSON.stringify(categories[0])});`.padEnd(40) + `// by category`,
    );
  }
  lines.push('```', ``);

  lines.push(
    `Each sign carries its own artwork, so nothing else has to be copied or served:`,
    ``,
    '```ts',
    `const sign = getSign(${JSON.stringify(example?.id ?? 'some-sign-id')})!;`,
    ``,
    `sign.svg;   // inline SVG markup (most signs)`,
    `sign.png;   // base64 PNG data URI (signs with no vector source)`,
    '```',
    ``,
    `> \`sign.assets\` holds paths into this repo's build-time \`assets/\` tree.`,
    `> That directory is ~16GB across all countries and is **not published** —`,
    `> use \`sign.svg\` or \`sign.png\` to render.`,
    ``,
  );

  if (signs.length > 0) {
    lines.push(
      `## Sprites`,
      ``,
      `\`dist/sprite.css\` — one class per sign, artwork embedded as a data URI:`,
      ``,
      '```html',
      `<link rel="stylesheet" href="node_modules/${pkg}/dist/sprite.css" />`,
      `<span class="rs-${cc}-${example?.id ?? 'sign-id'}" style="display:inline-block;width:64px;height:64px"></span>`,
      '```',
      ``,
      `\`dist/sprite.svg\` — an SVG symbol sheet:`,
      ``,
      '```html',
      `<svg width="64" height="64"><use href="node_modules/${pkg}/dist/sprite.svg#rs-${cc}-${example?.id ?? 'sign-id'}" /></svg>`,
      '```',
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

const FRAMEWORK: Record<string, { blurb: string; usage: string[] }> = {
  core: {
    blurb:
      'Shared TypeScript types and generic lookup helpers for every `@road-signs/*` country package.',
    usage: [
      "import { getSign, getSignsByCategory, decorateSvg } from '@road-signs/core';",
      "import type { Sign, ViennaSign } from '@road-signs/core';",
      '',
      '// The helpers are generic over any country registry.',
      'const sign = getSign(registry, "w1-1-turn");',
    ],
  },
  react: {
    blurb: 'Accessible React component for road signs — works with any country package.',
    usage: [
      "import { getSign } from '@road-signs/us';",
      "import { RoadSign } from '@road-signs/react';",
      '',
      'const sign = getSign("w1-1-turn")!;',
      '',
      '<RoadSign sign={sign} size={64} />;',
    ],
  },
  vue: {
    blurb: 'Accessible Vue 3 component for road signs — works with any country package.',
    usage: [
      "import { getSign } from '@road-signs/us';",
      "import { RoadSign } from '@road-signs/vue';",
      '',
      'const sign = getSign("w1-1-turn");',
      '',
      '// <RoadSign :sign="sign" :size="64" />',
    ],
  },
  elements: {
    blurb: 'Framework-free custom elements for road signs — works with any country package.',
    usage: [
      "import { registerRoadSign } from '@road-signs/elements';",
      "import { getSign } from '@road-signs/us';",
      '',
      'registerRoadSign("road-sign-us", getSign);',
      '',
      '// <road-sign-us sign-id="w1-1-turn" size="64"></road-sign-us>',
    ],
  },
};

const frameworkReadme = (name: string): string => {
  const pkg = `@road-signs/${name}`;
  const { blurb, usage } = FRAMEWORK[name];
  return [
    ...header(pkg, blurb),
    ...installBlock(pkg),
    `## Usage`,
    ``,
    '```ts',
    ...usage,
    '```',
    ``,
    `Every sign renders from the package alone: vector signs carry inline SVG,`,
    `and the handful with no vector source carry a base64 PNG data URI.`,
    `Accessible name and description are injected into the SVG automatically.`,
    ``,
    ...footer(pkg),
  ].join('\n');
};

const main = (): void => {
  const only = process.argv.find((a) => a.startsWith('--country='))?.split('=')[1];
  let written = 0;

  for (const name of Object.keys(FRAMEWORK)) {
    if (only) break;
    fs.writeFileSync(path.join(PACKAGES_DIR, name, 'README.md'), frameworkReadme(name), 'utf-8');
    written++;
  }

  for (const cc of only ? [only] : listCountries()) {
    fs.writeFileSync(
      path.join(PACKAGES_DIR, cc, 'README.md'),
      countryReadme(cc, COUNTRIES[cc]),
      'utf-8',
    );
    written++;
  }

  console.log(`Wrote ${written} READMEs.`);
};

main();
