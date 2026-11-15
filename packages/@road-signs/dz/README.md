# @road-signs/dz

Road signs for Algeria — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/dz
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 86                                                               |
| With vector artwork | 86                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Code de la route — Vienna Convention / French-influenced         |
| Regulator           | Ministry of Transport                                            |
| Drive side          | right-hand                                                       |
| Language(s)         | Arabic                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/dz';

signs; // the whole registry
getSign('a10-algeria-road-sign'); // by slug id
getSignByCode('A10'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a10-algeria-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Algeria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Algeria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/dz)

## License

MIT © Karl Norling
