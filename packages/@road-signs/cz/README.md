# @road-signs/cz

Road signs for Czech Republic — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/cz
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 270                                                              |
| With vector artwork | 193                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Zákon č. 361/2000 Sb. — Vienna Convention                        |
| Regulator           | MD ČR                                                            |
| Drive side          | right-hand                                                       |
| Language(s)         | Czech                                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cz';

signs; // the whole registry
getSign('i-1a-i-1a-dangerous-curve-to-the-right'); // by slug id
getSignByCode('I-1A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('i-1a-i-1a-dangerous-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **77 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Czech Republic are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/cz/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in the Czech Republic](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Czech_Republic)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cz)

## License

MIT © Karl Norling
