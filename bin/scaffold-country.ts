/**
 * scaffold-country.ts
 *
 * Creates a new country package that either:
 *   (a) re-exports another country's registry (e.g. va → it), or
 *   (b) is empty / awaits a future scrape.
 *
 * Lays down:
 *   packages/@road-signs/<cc>/{package.json, tsconfig.*, src/index.ts, src/types.ts}
 *   apps/docs/src/content/docs/countries/<cc>.mdx
 *   apps/docs/src/content/docs/gallery/<cc>.mdx
 *
 * Usage:
 *   yarn tsx bin/scaffold-country.ts --cc=va --name="Vatican City" --reexport=it
 *   yarn tsx bin/scaffold-country.ts --cc=bf --name="Burkina Faso" --standard="Code de la route — French-influenced"
 *
 * After running, manually:
 *   - Add the cc to apps/docs/astro.config.mjs (countryCodes + sidebar group)
 *   - Add the cc to bin/generate-docs.ts COUNTRIES dict
 *   - Run `yarn generate-docs` to inject coverage/hero
 *   - Run `yarn install` so workspaces register the new package
 */

import fs from 'fs';
import path from 'path';

interface Opts {
  cc: string;
  name: string;
  reexport?: string;
  standard?: string;
}

const parseArgs = (): Opts => {
  const get = (k: string): string | undefined =>
    process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=');
  const cc = get('cc');
  const name = get('name');
  if (!cc || !name) {
    console.error(
      `Usage: yarn tsx bin/scaffold-country.ts --cc=XX --name="Country Name" [--reexport=YY] [--standard="..."]`,
    );
    process.exit(1);
  }
  return { cc: cc.toLowerCase(), name, reexport: get('reexport')?.toLowerCase(), standard: get('standard') };
};

const writeIfMissing = (p: string, content: string): void => {
  if (fs.existsSync(p)) {
    console.log(`  exists, skipping: ${p}`);
    return;
  }
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf-8');
  console.log(`  wrote: ${p}`);
};

const upper = (cc: string): string => cc.toUpperCase();

const tsconfigBase = `{
  "compilerOptions": {
    "target": "ES2022",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "module": "commonjs",
    "moduleResolution": "bundler"
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/__tests__/**/*", "node_modules"]
}
`;

const tsconfigCjs = `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "bundler",
    "outDir": "./dist/cjs",
    "rootDir": "./src"
  }
}
`;

const tsconfigEsm = `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "outDir": "./dist/esm",
    "rootDir": "./src"
  }
}
`;

const packageJson = (cc: string, name: string, reexport?: string): string => {
  const deps: Record<string, string> = { '@road-signs/core': 'workspace:*' };
  if (reexport) deps[`@road-signs/${reexport}`] = 'workspace:*';
  return (
    JSON.stringify(
      {
        name: `@road-signs/${cc}`,
        version: '0.1.0',
        description: `${name} road signs — TypeScript registry, inline SVGs, and image assets${reexport ? ` (re-exports @road-signs/${reexport})` : ''}`,
        keywords: [
          'road-signs',
          'signs',
          'svg',
          'typescript',
          name.toLowerCase().replace(/\s+/g, '-'),
          cc,
        ],
        license: 'MIT',
        repository: {
          type: 'git',
          url: 'https://github.com/karlnorling/road-signs',
          directory: `packages/@road-signs/${cc}`,
        },
        files: ['dist/', ...(reexport ? [] : ['assets/']), 'package.json', 'README.md'],
        main: './dist/cjs/index.js',
        module: './dist/esm/index.js',
        types: './dist/esm/index.d.ts',
        exports: {
          '.': {
            import: './dist/esm/index.js',
            require: './dist/cjs/index.js',
            types: './dist/esm/index.d.ts',
          },
        },
        scripts: {
          compile:
            "tsc -p tsconfig.cjs.json && tsc -p tsconfig.esm.json && node -e \"require('fs').writeFileSync('dist/cjs/package.json', JSON.stringify({type:'commonjs'})); require('fs').writeFileSync('dist/esm/package.json', JSON.stringify({type:'module'}))\"",
          test: 'jest --passWithNoTests',
          'type-check': 'tsc --noEmit -p tsconfig.cjs.json',
        },
        dependencies: deps,
        devDependencies: {
          '@types/jest': '^30.0.0',
          jest: '^30.3.0',
          'ts-jest': '^29.4.0',
          typescript: '^6.0.0',
        },
        author: {
          name: 'Karl Norling',
          url: 'https://github.com/karlnorling',
        },
      },
      null,
      2,
    ) + '\n'
  );
};

const reexportTypes = (cc: string, base: string): string =>
  `// ${upper(cc)} uses the ${upper(base)} road-sign system.\n` +
  `// Re-exported from @road-signs/${base} to avoid duplicating the registry.\n` +
  `export type { ${upper(base)}Category as ${upper(cc)}Category, ${upper(base)}Sign as ${upper(cc)}Sign } from '@road-signs/${base}';\n`;

const reexportIndex = (cc: string, name: string, base: string): string =>
  `/**\n` +
  ` * @road-signs/${cc} — ${name} road signs.\n` +
  ` *\n` +
  ` * ${name} uses the ${upper(base)} road-sign system. Rather than ship a\n` +
  ` * duplicate registry, this package re-exports the ${upper(base)} catalogue\n` +
  ` * under ${upper(cc)}-prefixed names.\n` +
  ` */\n\n` +
  `import {\n` +
  `  signs,\n` +
  `  getAllSigns as baseGetAllSigns,\n` +
  `  getSign as baseGetSign,\n` +
  `  getSignByCode as baseGetSignByCode,\n` +
  `  getSignsByCategory as baseGetSignsByCategory,\n` +
  `} from '@road-signs/${base}';\n` +
  `import type { ${upper(base)}Category, ${upper(base)}Sign } from '@road-signs/${base}';\n\n` +
  `export type { ${upper(base)}Category as ${upper(cc)}Category, ${upper(base)}Sign as ${upper(cc)}Sign } from '@road-signs/${base}';\n\n` +
  `export { signs };\n\n` +
  `export const getAllSigns = (): ${upper(base)}Sign[] => baseGetAllSigns();\n\n` +
  `export const getSign = (id: string): ${upper(base)}Sign | undefined => baseGetSign(id);\n\n` +
  `export const getSignByCode = (code: string): ${upper(base)}Sign | undefined => baseGetSignByCode(code);\n\n` +
  `export const getSignsByCategory = (category: ${upper(base)}Category): ${upper(base)}Sign[] =>\n` +
  `  baseGetSignsByCategory(category);\n`;

const standaloneTypes = (cc: string): string =>
  `export type { ViennaCategory as ${upper(cc)}Category, ViennaSign as ${upper(cc)}Sign } from '@road-signs/core';\n`;

const standaloneIndex = (cc: string): string =>
  `import type { ${upper(cc)}Category, ${upper(cc)}Sign } from './types';\n` +
  `import { signs } from './signs.generated';\n\n` +
  `export type { ${upper(cc)}Category, ${upper(cc)}Sign } from './types';\n` +
  `export { signs };\n\n` +
  `export const getAllSigns = (): ${upper(cc)}Sign[] => [...signs];\n\n` +
  `export const getSign = (id: string): ${upper(cc)}Sign | undefined =>\n` +
  `  signs.find((s) => s.id === id);\n\n` +
  `export const getSignByCode = (code: string): ${upper(cc)}Sign | undefined =>\n` +
  `  signs.find((s) => s.code === code);\n\n` +
  `export const getSignsByCategory = (category: ${upper(cc)}Category): ${upper(cc)}Sign[] =>\n` +
  `  signs.filter((s) => s.category === category);\n`;

const emptySignsGenerated = (cc: string): string =>
  `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n` +
  `// Run 'yarn update --country=${cc}' to regenerate.\n` +
  `// Empty: no signs scraped yet.\n\n` +
  `import type { ${upper(cc)}Sign } from './types';\n\n` +
  `export const signs: ${upper(cc)}Sign[] = [];\n`;

const overviewMdx = (cc: string, name: string, reexport?: string): string => {
  const base = reexport ? `@road-signs/${reexport}` : `@road-signs/${cc}`;
  const intro = reexport
    ? `The \`@road-signs/${cc}\` package re-exports the \`${base}\` registry. ${name} follows the same road-sign system.`
    : `The \`@road-signs/${cc}\` package contains ${name} road signs.`;
  return (
    `---\n` +
    `title: ${name} (${upper(cc)})\n` +
    `description: ${name} road signs — categories, installation, and usage.\n` +
    `---\n\n` +
    `import { Tabs, TabItem } from '@astrojs/starlight/components';\n\n` +
    `${intro}\n\n` +
    `## Installation\n\n` +
    '```sh\n' +
    `npm install @road-signs/${cc}\n` +
    '```\n\n' +
    `## Usage\n\n` +
    `<Tabs>\n` +
    `  <TabItem label="TypeScript">\n` +
    '    ```ts\n' +
    `    import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/${cc}';\n\n` +
    `    // All signs\n` +
    `    signs.length;\n\n` +
    `    // By slug ID\n` +
    `    const sign = getSign("example-sign");\n\n` +
    `    // By sign code\n` +
    `    const s = getSignByCode("1.1");\n\n` +
    `    // All warning signs\n` +
    `    const filtered = getSignsByCategory('warning');\n` +
    '    ```\n' +
    `  </TabItem>\n` +
    `  <TabItem label="React">\n` +
    '    ```tsx\n' +
    `    import { getSignsByCategory } from '@road-signs/${cc}';\n` +
    `    import { RoadSign } from '@road-signs/react';\n\n` +
    `    const warnings = getSignsByCategory('warning');\n\n` +
    `    export default function WarningGrid() {\n` +
    `      return (\n` +
    `        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>\n` +
    `          {warnings.map((sign) => (\n` +
    `            <RoadSign key={sign.id} sign={sign} size={64} />\n` +
    `          ))}\n` +
    `        </div>\n` +
    `      );\n` +
    `    }\n` +
    '    ```\n' +
    `  </TabItem>\n` +
    `</Tabs>\n\n` +
    `## TypeScript types\n\n` +
    '```ts\n' +
    `import type { ${upper(cc)}Sign, ${upper(cc)}Category } from '@road-signs/${cc}';\n` +
    '```\n'
  );
};

const galleryMdx = (cc: string, name: string): string =>
  `---\n` +
  `title: ${name} — Sign Gallery\n` +
  `description: Browse ${name} road signs, filterable by category.\n` +
  `tableOfContents: false\n` +
  `---\n\n` +
  `import { getAllSigns } from '@road-signs/${cc}';\n` +
  `import CountryGallery from '../../../components/CountryGallery.astro';\n\n` +
  `<CountryGallery signs={getAllSigns()} />\n`;

const main = (): void => {
  const { cc, name, reexport } = parseArgs();
  const pkgDir = path.join('packages', '@road-signs', cc);
  const docsDir = path.join('apps', 'docs', 'src', 'content', 'docs');

  console.log(`Scaffolding @road-signs/${cc} (${name})${reexport ? ` — re-exports ${reexport}` : ''}`);

  writeIfMissing(path.join(pkgDir, 'package.json'), packageJson(cc, name, reexport));
  writeIfMissing(path.join(pkgDir, 'tsconfig.json'), tsconfigBase);
  writeIfMissing(path.join(pkgDir, 'tsconfig.cjs.json'), tsconfigCjs);
  writeIfMissing(path.join(pkgDir, 'tsconfig.esm.json'), tsconfigEsm);

  if (reexport) {
    writeIfMissing(path.join(pkgDir, 'src', 'types.ts'), reexportTypes(cc, reexport));
    writeIfMissing(path.join(pkgDir, 'src', 'index.ts'), reexportIndex(cc, name, reexport));
  } else {
    writeIfMissing(path.join(pkgDir, 'src', 'types.ts'), standaloneTypes(cc));
    writeIfMissing(path.join(pkgDir, 'src', 'index.ts'), standaloneIndex(cc));
    writeIfMissing(path.join(pkgDir, 'src', 'signs.generated.ts'), emptySignsGenerated(cc));
  }

  writeIfMissing(path.join(docsDir, 'countries', `${cc}.mdx`), overviewMdx(cc, name, reexport));
  writeIfMissing(path.join(docsDir, 'gallery', `${cc}.mdx`), galleryMdx(cc, name));

  console.log(`\nNext steps:`);
  console.log(`  1. Add '${cc}' to countryCodes in apps/docs/astro.config.mjs`);
  console.log(`  2. Add ${cc.toUpperCase()} entry to COUNTRIES in bin/generate-docs.ts`);
  console.log(`  3. Run \`yarn install && yarn generate-docs\``);
};

main();
