# @road-signs/sk

Road signs for Slovakia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/sk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 133                                                              |
| With vector artwork | 133                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Zákon č. 8/2009 Z. z. — Vienna Convention                        |
| Regulator           | MDV SR                                                           |
| Drive side          | right-hand                                                       |
| Language(s)         | Slovak                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sk';

signs; // the whole registry
getSign('1-1-curve-to-the-right-formerly-used-1-1-curve-to-the-right-formerly-used'); // by slug id
getSignByCode('1-1-curve-to-the-right-formerly-used'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-1-curve-to-the-right-formerly-used-1-1-curve-to-the-right-formerly-used')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Slovakia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovakia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sk)

## License

MIT © Karl Norling
