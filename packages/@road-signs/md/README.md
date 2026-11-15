# @road-signs/md

Road signs for Moldova — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/md
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 294                                                              |
| With vector artwork | 294                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/md';

signs; // the whole registry
getSign('level-crossing-with-barriers-level-crossing-with-barriers'); // by slug id
getSignByCode('level-crossing-with-barriers'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('level-crossing-with-barriers-level-crossing-with-barriers')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Moldova](https://en.wikipedia.org/wiki/Road_signs_in_Moldova)
- [Wikimedia Commons — SVG road signs in Moldova](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Moldova)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/md)

## License

MIT © Karl Norling
