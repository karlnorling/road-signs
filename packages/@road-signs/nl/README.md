# @road-signs/nl

Road signs for Netherlands — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/nl
```

## At a glance

|                     |                                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| Signs               | 240                                                                       |
| With vector artwork | 240                                                                       |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning`          |
| Standard            | RVV 1990 (Reglement Verkeersregels en Verkeerstekens) — Vienna Convention |
| Regulator           | CROW (RVV 1990)                                                           |
| Drive side          | right-hand                                                                |
| Language(s)         | Dutch                                                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/nl';

signs; // the whole registry
getSign('j1-uneven-road'); // by slug id
getSignByCode('J1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('j1-uneven-road')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in the Netherlands](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands)

## Notes

Several series (J, B, E, G, H, L, K) are raster-only on Wikimedia; SVG coverage is ~67%.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/nl)

## License

MIT © Karl Norling
