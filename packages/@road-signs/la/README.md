# @road-signs/la

Road signs for Laos — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/la
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 33                                                               |
| With vector artwork | 32                                                               |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (Lao PDR Road Traffic Law)                     |
| Regulator           | MPWT                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Lao                                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/la';

signs; // the whole registry
getSign('v1-curve-to-left'); // by slug id
getSignByCode('V1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('v1-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **1 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Laos are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/la/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Laos](https://en.wikipedia.org/wiki/Road_signs_in_Laos)
- [Wikimedia Commons — SVG road signs in Laos](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Laos)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/la)

## License

MIT © Karl Norling
