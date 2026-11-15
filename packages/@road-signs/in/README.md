# @road-signs/in

Road signs for India — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/in
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 214                                                  |
| With vector artwork | 213                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Motor Vehicles Act — IRC:67 standard                 |
| Regulator           | IRC:67                                               |
| Drive side          | left-hand                                            |
| Language(s)         | Hindi, English                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/in';

signs; // the whole registry
getSign('left-curve-left-curve'); // by slug id
getSignByCode('left-curve'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('left-curve-left-curve')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **1 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for India are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/in/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in India](https://commons.wikimedia.org/wiki/Category:Road_signs_in_India)
- [Wikimedia Commons — SVG road signs in India](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_India)

## Notes

Categories: Cautionary (warning), Mandatory (prohibitory/regulatory), Informatory (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/in)

## License

MIT © Karl Norling
