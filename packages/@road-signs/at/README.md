# @road-signs/at

Road signs for Austria — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/at
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 200                                                              |
| With vector artwork | 200                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | StVO (Straßenverkehrs-Ordnung) — Vienna Convention               |
| Regulator           | BMK (StVO)                                                       |
| Drive side          | right-hand                                                       |
| Language(s)         | German                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/at';

signs; // the whole registry
getSign('1-uneven-road-1-uneven-road'); // by slug id
getSignByCode('1-uneven-road'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-uneven-road-1-uneven-road')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Austria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Austria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/at)

## License

MIT © Karl Norling
