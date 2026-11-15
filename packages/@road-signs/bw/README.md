# @road-signs/bw

Road signs for Botswana — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/bw
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 354                                                  |
| With vector artwork | 354                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | British-derived (Road Traffic Act)                   |
| Regulator           | Department of Road Transport                         |
| Drive side          | left-hand                                            |
| Language(s)         | English, Setswana                                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bw';

signs; // the whole registry
getSign('crossroad-ahead-crossroad-ahead'); // by slug id
getSignByCode('crossroad-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-ahead-crossroad-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Botswana](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Botswana)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bw)

## License

MIT © Karl Norling
