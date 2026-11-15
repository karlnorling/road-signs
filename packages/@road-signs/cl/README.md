# @road-signs/cl

Road signs for Chile — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/cl
```

## At a glance

|                     |                                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| Signs               | 144                                                                       |
| With vector artwork | 144                                                                       |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning`          |
| Standard            | Manual de Señalización de Tránsito (DGOP/MOP) — Vienna Convention variant |
| Regulator           | MOP (DGOP)                                                                |
| Drive side          | right-hand                                                                |
| Language(s)         | Spanish                                                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cl';

signs; // the whole registry
getSign('pg-1a-pg-1a-gentle-curve-to-the-right'); // by slug id
getSignByCode('PG-1A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('pg-1a-pg-1a-gentle-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Chile](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Chile)
- [Wikimedia Commons — Road signs in Chile (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Chile)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cl)

## License

MIT © Karl Norling
