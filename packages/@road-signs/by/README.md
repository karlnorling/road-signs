# @road-signs/by

Road signs for Belarus — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/by
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 358                                                              |
| With vector artwork | 358                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (STB 1140-2013)                                |
| Regulator           | Belarusian State Auto Inspection                                 |
| Drive side          | right-hand                                                       |
| Language(s)         | Belarusian, Russian                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/by';

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

- [Wikipedia — Road signs in Belarus](https://en.wikipedia.org/wiki/Road_signs_in_Belarus)
- [Wikimedia Commons — SVG road signs in Belarus](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belarus)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/by)

## License

MIT © Karl Norling
