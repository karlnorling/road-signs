# @road-signs/ar

Road signs for Argentina — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ar
```

## At a glance

|                     |                                                                              |
| ------------------- | ---------------------------------------------------------------------------- |
| Signs               | 140                                                                          |
| With vector artwork | 140                                                                          |
| Categories          | `prohibitory`, `warning`                                                     |
| Standard            | Decreto 779/95 — Reglamento Nacional de Tránsito (Vienna Convention variant) |
| Regulator           | CNRT                                                                         |
| Drive side          | right-hand                                                                   |
| Language(s)         | Spanish                                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ar';

signs; // the whole registry
getSign('railway-crossing-ahead-railway-crossing-ahead'); // by slug id
getSignByCode('railway-crossing-ahead'); // by official code
getSignsByCategory('prohibitory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('railway-crossing-ahead-railway-crossing-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Argentina](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Argentina)
- [Wikimedia Commons — Road signs in Argentina (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Argentina)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ar)

## License

MIT © Karl Norling
