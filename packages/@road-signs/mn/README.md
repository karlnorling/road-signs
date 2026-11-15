# @road-signs/mn

Road signs for Mongolia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mn
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 167                                                              |
| With vector artwork | 167                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mn';

signs; // the whole registry
getSign('level-crossing-with-barrier-or-gate-level-crossing-with-barrier-or-gate'); // by slug id
getSignByCode('level-crossing-with-barrier-or-gate'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('level-crossing-with-barrier-or-gate-level-crossing-with-barrier-or-gate')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Mongolia](https://en.wikipedia.org/wiki/Road_signs_in_Mongolia)
- [Wikimedia Commons — SVG road signs in Mongolia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mongolia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mn)

## License

MIT © Karl Norling
