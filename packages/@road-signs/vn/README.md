# @road-signs/vn

Road signs for Vietnam — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/vn
```

## At a glance

|                     |                                                         |
| ------------------- | ------------------------------------------------------- |
| Signs               | 734                                                     |
| With vector artwork | 734                                                     |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`    |
| Standard            | Vienna Convention adjacent (Ministry of Transport 2019) |
| Regulator           | Ministry of Transport                                   |
| Drive side          | right-hand                                              |
| Language(s)         | Vietnamese                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/vn';

signs; // the whole registry
getSign('w-201a-w-201a-bend-to-left'); // by slug id
getSignByCode('W.201A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w-201a-w-201a-bend-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Vietnam](https://en.wikipedia.org/wiki/Road_signs_in_Vietnam)
- [Wikimedia Commons — SVG road signs in Vietnam](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Vietnam)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/vn)

## License

MIT © Karl Norling
