# @road-signs/uy

Road signs for Uruguay — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/uy
```

## At a glance

|                     |                                                                               |
| ------------------- | ----------------------------------------------------------------------------- |
| Signs               | 62                                                                            |
| With vector artwork | 62                                                                            |
| Categories          | `information`, `warning`                                                      |
| Standard            | Decreto 374/004 — Reglamento Nacional de Tránsito (Vienna Convention variant) |
| Regulator           | Dirección Nacional de Tránsito                                                |
| Drive side          | right-hand                                                                    |
| Language(s)         | Spanish                                                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/uy';

signs; // the whole registry
getSign('uruguay-road-sign-equestrians-uruguay-road-sign-equestrians'); // by slug id
getSignByCode('uruguay-road-sign-equestrians'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('uruguay-road-sign-equestrians-uruguay-road-sign-equestrians')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Uruguay](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uruguay)
- [Wikimedia Commons — Road signs in Uruguay (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Uruguay)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/uy)

## License

MIT © Karl Norling
