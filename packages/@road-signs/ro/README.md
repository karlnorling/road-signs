# @road-signs/ro

Road signs for Romania — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ro
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 305                                                              |
| With vector artwork | 305                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Codul rutier (OUG 195/2002) — Vienna Convention                  |
| Regulator           | IGPR                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Romanian                                                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ro';

signs; // the whole registry
getSign('dangerous-curve-to-the-left-dangerous-curve-to-the-left'); // by slug id
getSignByCode('dangerous-curve-to-the-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-the-left-dangerous-curve-to-the-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Romania](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Romania)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ro)

## License

MIT © Karl Norling
