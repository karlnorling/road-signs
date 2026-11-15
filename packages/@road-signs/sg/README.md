# @road-signs/sg

Road signs for Singapore — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/sg
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 137                                                              |
| With vector artwork | 137                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Road Traffic Act (Traffic Signs) Rules — Vienna Convention       |
| Regulator           | LTA                                                              |
| Drive side          | left-hand                                                        |
| Language(s)         | English                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sg';

signs; // the whole registry
getSign('danger-danger'); // by slug id
getSignByCode('danger'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('danger-danger')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Singapore](https://en.wikipedia.org/wiki/Road_signs_in_Singapore)
- [Wikimedia Commons — Road signs in Singapore](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Singapore)
- [Wikimedia Commons — Road signs in Singapore (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Singapore)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sg)

## License

MIT © Karl Norling
