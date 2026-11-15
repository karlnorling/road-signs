# @road-signs/jp

Road signs for Japan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/jp
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 126                                                  |
| With vector artwork | 126                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Road Traffic Law (道路交通法)                        |
| Regulator           | National Police Agency                               |
| Drive side          | left-hand                                            |
| Language(s)         | Japanese                                             |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/jp';

signs; // the whole registry
getSign('crossroads-crossroads'); // by slug id
getSignByCode('crossroads'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroads-crossroads')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Japan](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Japan)

## Notes

Codes are 3-digit numeric: 1xx (regulatory), 2xx (warning), 3xx (instruction), 4xx (guide).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/jp)

## License

MIT © Karl Norling
