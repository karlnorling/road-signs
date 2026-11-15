# @road-signs/ru

Road signs for Russia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ru
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 496                                                              |
| With vector artwork | 496                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (ГОСТ Р 52290)                                 |
| Regulator           | ГИБДД (GIBDD)                                                    |
| Drive side          | right-hand                                                       |
| Language(s)         | Russian                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ru';

signs; // the whole registry
getSign('1-1-railway-crossing-with-barriers-1-1-railway-crossing-with-barriers'); // by slug id
getSignByCode('1-1-railway-crossing-with-barriers'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-1-railway-crossing-with-barriers-1-1-railway-crossing-with-barriers')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Russia](https://en.wikipedia.org/wiki/Road_signs_in_Russia)
- [Wikimedia Commons — SVG road signs in Russia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Russia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ru)

## License

MIT © Karl Norling
