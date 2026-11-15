# @road-signs/au

Road signs for Australia — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/au
```

## At a glance

|                     |                                                    |
| ------------------- | -------------------------------------------------- |
| Signs               | 446                                                |
| With vector artwork | 443                                                |
| Categories          | `information`, `prohibitory`, `warning`            |
| Standard            | AS1742 (Manual of Uniform Traffic Control Devices) |
| Regulator           | Austroads (AS1742)                                 |
| Drive side          | left-hand                                          |
| Language(s)         | English                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/au';

signs; // the whole registry
getSign('w1-1-90-sharp-turn-to-left'); // by slug id
getSignByCode('W1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w1-1-90-sharp-turn-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **3 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Australia are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/au/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Australia](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Australia)
- [Wikimedia Commons — SVG road signs in Australia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Australia)

## Notes

Sign codes and designs vary by state/territory; national AS1742 standards are used where available.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/au)

## License

MIT © Karl Norling
