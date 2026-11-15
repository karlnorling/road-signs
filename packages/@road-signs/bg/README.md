# @road-signs/bg

Road signs for Bulgaria — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/bg
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 188                                                              |
| With vector artwork | 188                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Закон за движението по пътищата (ZDP) — Vienna Convention        |
| Regulator           | API                                                              |
| Drive side          | right-hand                                                       |
| Language(s)         | Bulgarian                                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bg';

signs; // the whole registry
getSign('1-right-curve-1-right-curve'); // by slug id
getSignByCode('1-right-curve'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-right-curve-1-right-curve')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Bulgaria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bulgaria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bg)

## License

MIT © Karl Norling
