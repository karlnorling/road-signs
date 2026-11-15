# @road-signs/se

Road signs for Sweden — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/se
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 267                                                              |
| With vector artwork | 267                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vägmärkesförordning (VMF) — Vienna Convention                    |
| Regulator           | Trafikverket (VMF)                                               |
| Drive side          | right-hand                                                       |
| Language(s)         | Swedish                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/se';

signs; // the whole registry
getSign('dangerous-curve-to-left-dangerous-curve-to-left'); // by slug id
getSignByCode('dangerous-curve-to-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-left-dangerous-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Sweden](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sweden)
- [Wikimedia Commons — Road signs in Sweden (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Sweden)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/se)

## License

MIT © Karl Norling
