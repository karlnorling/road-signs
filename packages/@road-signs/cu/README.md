# @road-signs/cu

Road signs for Cuba — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/cu
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 43                                                               |
| With vector artwork | 43                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention variant                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cu';

signs; // the whole registry
getSign('v3-intersection-with-priority'); // by slug id
getSignByCode('V3'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('v3-intersection-with-priority')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Cuba](https://en.wikipedia.org/wiki/Road_signs_in_Cuba)
- [Wikimedia Commons — SVG road signs in Cuba](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cuba)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cu)

## License

MIT © Karl Norling
