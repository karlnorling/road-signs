# @road-signs/il

Road signs for Israel — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/il
```

## At a glance

|                     |                                               |
| ------------------- | --------------------------------------------- |
| Signs               | 136                                           |
| With vector artwork | 136                                           |
| Categories          | `information`, `prohibitory`, `warning`       |
| Standard            | Israeli Traffic Ordinance — Vienna Convention |
| Regulator           | Israel Ministry of Transport                  |
| Drive side          | right-hand                                    |
| Language(s)         | Hebrew, Arabic                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/il';

signs; // the whole registry
getSign('uneven-road-uneven-road'); // by slug id
getSignByCode('uneven-road'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('uneven-road-uneven-road')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Israel](https://en.wikipedia.org/wiki/Road_signs_in_Israel)
- [Wikimedia Commons — Road signs in Israel](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Israel)
- [Wikimedia Commons — Road signs in Israel (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Israel)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/il)

## License

MIT © Karl Norling
