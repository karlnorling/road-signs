# @road-signs/kr

Road signs for South Korea — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/kr
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 146                                                  |
| With vector artwork | 146                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Road Traffic Act (도로교통법)                        |
| Regulator           | KNPA                                                 |
| Drive side          | right-hand                                           |
| Language(s)         | Korean                                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kr';

signs; // the whole registry
getSign('crossroad-crossroad'); // by slug id
getSignByCode('crossroad'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-crossroad')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in South Korea](https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Korea)
- [Wikimedia Commons — SVG road signs in South Korea](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Korea)

## Notes

Codes are numeric: 1xx (regulatory/prohibitory), 2xx (warning), 3xx (instruction), 4xx (guide).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kr)

## License

MIT © Karl Norling
