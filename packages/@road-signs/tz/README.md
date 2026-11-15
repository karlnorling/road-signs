# @road-signs/tz

Road signs for Tanzania — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/tz
```

## At a glance

|                     |                                         |
| ------------------- | --------------------------------------- |
| Signs               | 322                                     |
| With vector artwork | 321                                     |
| Categories          | `information`, `prohibitory`, `warning` |
| Standard            | British-derived (Road Traffic Act)      |
| Regulator           | SUMATRA                                 |
| Drive side          | left-hand                               |
| Language(s)         | Swahili, English                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/tz';

signs; // the whole registry
getSign('crossroad-ahead-crossroad-ahead'); // by slug id
getSignByCode('crossroad-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-ahead-crossroad-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **1 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Tanzania are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/tz/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Tanzania](https://en.wikipedia.org/wiki/Road_signs_in_Tanzania)
- [Wikimedia Commons — SVG road signs in Tanzania](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tanzania)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/tz)

## License

MIT © Karl Norling
