# @road-signs/az

Road signs for Azerbaijan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/az
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 265                                                              |
| With vector artwork | 265                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/az';

signs; // the whole registry
getSign(
  '1-1-level-crossing-ahead-with-barriers-or-gates-1-1-level-crossing-ahead-with-barriers-or-gates',
); // by slug id
getSignByCode('1-1-level-crossing-ahead-with-barriers-or-gates'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  '1-1-level-crossing-ahead-with-barriers-or-gates-1-1-level-crossing-ahead-with-barriers-or-gates',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Azerbaijan](https://en.wikipedia.org/wiki/Road_signs_in_Azerbaijan)
- [Wikimedia Commons — SVG road signs in Azerbaijan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Azerbaijan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/az)

## License

MIT © Karl Norling
