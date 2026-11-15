# @road-signs/no

Road signs for Norway — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/no
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 266                                                              |
| With vector artwork | 256                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Skiltforskriften — Vienna Convention                             |
| Regulator           | Statens vegvesen                                                 |
| Drive side          | right-hand                                                       |
| Language(s)         | Norwegian                                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/no';

signs; // the whole registry
getSign('curve-to-right-curve-to-right'); // by slug id
getSignByCode('curve-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-right-curve-to-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **10 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Norway are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/no/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Norway](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Norway)

## Notes

Codes are numeric: 1xx (warning), 2xx (priority), 3xx (prohibitory), 4xx (mandatory), 5–7xx (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/no)

## License

MIT © Karl Norling
