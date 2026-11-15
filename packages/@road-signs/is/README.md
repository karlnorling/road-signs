# @road-signs/is

Road signs for Iceland — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/is
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 331                                                  |
| With vector artwork | 331                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Umferðarlög — Vienna Convention                      |
| Regulator           | Vegagerðin                                           |
| Drive side          | right-hand                                           |
| Language(s)         | Icelandic                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/is';

signs; // the whole registry
getSign('dangerous-curve-to-right-dangerous-curve-to-right'); // by slug id
getSignByCode('dangerous-curve-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-right-dangerous-curve-to-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Iceland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iceland)
- [Wikimedia Commons — Road signs in Iceland (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Iceland)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/is)

## License

MIT © Karl Norling
