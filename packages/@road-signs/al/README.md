# @road-signs/al

Road signs for Albania — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/al
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 155                                                              |
| With vector artwork | 155                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Kodi Rrugor — Vienna Convention                                  |
| Regulator           | Drejtoria e Përgjithshme e Rrugëve                               |
| Drive side          | right-hand                                                       |
| Language(s)         | Albanian                                                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/al';

signs; // the whole registry
getSign('deer-on-road-ahead-deer-on-road-ahead'); // by slug id
getSignByCode('deer-on-road-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('deer-on-road-ahead-deer-on-road-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Albania](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Albania)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/al)

## License

MIT © Karl Norling
