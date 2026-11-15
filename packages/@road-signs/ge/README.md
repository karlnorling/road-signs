# @road-signs/ge

Road signs for Georgia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ge
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 245                                                              |
| With vector artwork | 245                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ge';

signs; // the whole registry
getSign('level-crossing-with-barriers-or-gates-level-crossing-with-barriers-or-gates'); // by slug id
getSignByCode('level-crossing-with-barriers-or-gates'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  'level-crossing-with-barriers-or-gates-level-crossing-with-barriers-or-gates',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Georgia](https://en.wikipedia.org/wiki/Road_signs_in_Georgia)
- [Wikimedia Commons — SVG road signs in Georgia](<https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Georgia_(country)>)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ge)

## License

MIT © Karl Norling
