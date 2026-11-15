# @road-signs/ua

Road signs for Ukraine — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ua
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 309                                                              |
| With vector artwork | 309                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Правила дорожнього руху (PDR) — Vienna Convention                |
| Regulator           | Ukravtodor                                                       |
| Drive side          | right-hand                                                       |
| Language(s)         | Ukrainian                                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ua';

signs; // the whole registry
getSign('curve-to-the-right-curve-to-the-right'); // by slug id
getSignByCode('curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-right-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Ukraine](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ukraine)

## Notes

Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5.xx (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ua)

## License

MIT © Karl Norling
