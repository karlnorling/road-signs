# @road-signs/hu

Road signs for Hungary — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/hu
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 417                                                              |
| With vector artwork | 417                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | KRESZ (Közúti Közlekedési Szabályzat) — Vienna Convention        |
| Regulator           | NKH (KRESZ)                                                      |
| Drive side          | right-hand                                                       |
| Language(s)         | Hungarian                                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/hu';

signs; // the whole registry
getSign('a-001-dangerous-curve-to-left'); // by slug id
getSignByCode('A-001'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a-001-dangerous-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Hungary](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Hungary)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/hu)

## License

MIT © Karl Norling
