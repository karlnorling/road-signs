# @road-signs/mx

Road signs for Mexico — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mx
```

## At a glance

|                     |                                                                              |
| ------------------- | ---------------------------------------------------------------------------- |
| Signs               | 316                                                                          |
| With vector artwork | 314                                                                          |
| Categories          | `information`, `prohibitory`, `warning`                                      |
| Standard            | SCT (Secretaría de Comunicaciones y Transportes) — Vienna Convention variant |
| Regulator           | SCT                                                                          |
| Drive side          | right-hand                                                                   |
| Language(s)         | Spanish                                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mx';

signs; // the whole registry
getSign('sp-6a-curve-left'); // by slug id
getSignByCode('SP-6A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('sp-6a-curve-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **2 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Mexico are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/mx/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Mexico](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mexico)
- [Wikimedia Commons — Road signs in Mexico (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Mexico)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mx)

## License

MIT © Karl Norling
