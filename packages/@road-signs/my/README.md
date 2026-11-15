# @road-signs/my

Road signs for Malaysia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/my
```

## At a glance

|                     |                                                               |
| ------------------- | ------------------------------------------------------------- |
| Signs               | 341                                                           |
| With vector artwork | 341                                                           |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`          |
| Standard            | Road Transport (Traffic Signs) Rules 1959 — Vienna Convention |
| Regulator           | JKR                                                           |
| Drive side          | left-hand                                                     |
| Language(s)         | Malay                                                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/my';

signs; // the whole registry
getSign('uneven-surface-uneven-surface'); // by slug id
getSignByCode('uneven-surface'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('uneven-surface-uneven-surface')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Malaysia](https://en.wikipedia.org/wiki/Road_signs_in_Malaysia)
- [Wikimedia Commons — Road signs in Malaysia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Malaysia)
- [Wikimedia Commons — Road signs in Malaysia (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Malaysia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/my)

## License

MIT © Karl Norling
