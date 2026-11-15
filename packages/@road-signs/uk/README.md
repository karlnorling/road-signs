# @road-signs/uk

Road signs for United Kingdom — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/uk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 468                                                              |
| With vector artwork | 453                                                              |
| Categories          | `direction`, `information`, `regulatory`, `temporary`, `warning` |
| Standard            | TSRGD (Traffic Signs Regulations and General Directions)         |
| Regulator           | DfT (TSRGD 2016)                                                 |
| Drive side          | left-hand                                                        |
| Language(s)         | English, Welsh                                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/uk';

signs; // the whole registry
getSign('stop-or-give-way-ahead-stop-or-give-way-ahead'); // by slug id
getSignByCode('stop-or-give-way-ahead'); // by official code
getSignsByCategory('direction'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('stop-or-give-way-ahead-stop-or-give-way-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **15 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for United Kingdom are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/uk/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Warning signs of the UK](https://commons.wikimedia.org/wiki/Category:Warning_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Regulatory signs of the UK](https://commons.wikimedia.org/wiki/Category:Regulatory_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Information signs of the UK](https://commons.wikimedia.org/wiki/Category:Information_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Direction signs of the UK](https://commons.wikimedia.org/wiki/Category:Direction_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Road works signs of the UK](https://commons.wikimedia.org/wiki/Category:Road_works_signs_of_the_United_Kingdom)
- [Wikimedia Commons — Road signs in the UK](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Kingdom)

## Notes

Variable-message motorway signs (direction/temporary categories) are raster-only on Wikimedia.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/uk)

## License

MIT © Karl Norling
