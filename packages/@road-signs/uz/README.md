# @road-signs/uz

Road signs for Uzbekistan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/uz
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 279                                                              |
| With vector artwork | 279                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (ГОСТ Р 52290)                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/uz';

signs; // the whole registry
getSign('1-1-railway-crossing-with-a-barrier-1-1-railway-crossing-with-a-barrier'); // by slug id
getSignByCode('1-1-railway-crossing-with-a-barrier'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-1-railway-crossing-with-a-barrier-1-1-railway-crossing-with-a-barrier')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Uzbekistan](https://en.wikipedia.org/wiki/Road_signs_in_Uzbekistan)
- [Wikimedia Commons — SVG road signs in Uzbekistan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uzbekistan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/uz)

## License

MIT © Karl Norling
