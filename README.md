# road-signs

Road sign artwork and TypeScript registries — **one npm package per country** — plus
framework adapters for React, Vue 3 and plain custom elements.

```sh
npm install @road-signs/us @road-signs/react
```

```tsx
import { getSign } from '@road-signs/us';
import { RoadSign } from '@road-signs/react';

<RoadSign sign={getSign('w1-1-turn')!} size={64} />;
```

📚 **[Documentation & sign galleries](https://karlnorling.github.io/road-signs)**

## What's in a country package

Every sign carries its own artwork, so a package renders with no other files served
or copied:

| Field             |                                                         |
| ----------------- | ------------------------------------------------------- |
| `svg`             | Inline, SVGO-optimised SVG markup — almost every sign   |
| `png`             | Base64 PNG data URI — the handful with no vector source |
| `dist/sprite.svg` | SVG `<symbol>` sheet, one symbol per sign               |
| `dist/sprite.css` | One class per sign, artwork embedded as a data URI      |

`sign.assets` holds paths into this repo's build-time `assets/` tree. That directory
is ~16GB across all countries and is **not published** — render from `svg` or `png`.

## Packages

| Package                |                                                                   |
| ---------------------- | ----------------------------------------------------------------- |
| `@road-signs/{cc}`     | One per country, e.g. `us`, `uk`, `de`, `jp` — registry + sprites |
| `@road-signs/core`     | Shared `Sign<TCategory>` type and generic lookup helpers          |
| `@road-signs/react`    | React component                                                   |
| `@road-signs/vue`      | Vue 3 component                                                   |
| `@road-signs/elements` | Custom elements (`registerRoadSign`)                              |

Each country package binds the core helpers to its own registry, so the API is the
same everywhere: `signs`, `getAllSigns()`, `getSign(id)`, `getSignByCode(code)`,
`getSignsByCategory(category)`.

## Coverage

197 country packages; 132 carry signs today (29,897 in total), 63 are scaffolded but
still empty, and 2 (`sm`, `va`) re-export Italy's catalogue. Per-country coverage and
sources are on the [docs site](https://karlnorling.github.io/road-signs).

## Working on this repo

Requires Node ≥ 24 and Yarn 4 (via Corepack).

```sh
corepack enable
yarn install
yarn compile        # build every package's dist/, then its sprites
yarn test           # package tests + bin/ tests
```

### Data pipeline

The registries are generated, then **committed** — they are the source of truth for
releases, and CI never re-scrapes.

```sh
yarn update --country=us   # scrape → download assets → generate registry
yarn fill-gaps --country=us
yarn generate-docs
yarn generate-readmes
```

`yarn update` re-scrapes and overwrites `data/{cc}/scraped.json`, so never run it
after `yarn fill-gaps` for the same country — it discards the gap-filled data.

### Checks

| Command                    |                                                                |
| -------------------------- | -------------------------------------------------------------- |
| `yarn lint`                | oxlint                                                         |
| `yarn format`              | oxfmt                                                          |
| `yarn type-check`          | every package, plus `bin/`                                     |
| `yarn validate-categories` | every sign's category is in its country's union                |
| `yarn validate-registries` | artwork present, IDs unique and derivable, country lists agree |
| `yarn test`                | unit tests                                                     |

`validate-registries` exists because the generated registries carry `@ts-nocheck`
(the literal unions exceed tsc's complexity limit), so type-checking never looks
inside the thing that actually ships.

### Releasing

See [RELEASING.md](./RELEASING.md). Changesets drives versioning; the release
workflow runs `yarn compile` only — never `yarn build`, which would re-scrape every
country.

## Sources & licence

Sign artwork is sourced from Wikimedia Commons and national highway authorities;
per-country sources are listed in each package's README and on the docs site. Most
road sign designs are public domain or government works, but **licensing varies by
country — check the sources for your jurisdiction before commercial use.**

The code in this repository is MIT © Karl Norling.
