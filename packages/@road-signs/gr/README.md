# @road-signs/gr

Road signs for Greece — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/gr
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 444                                                  |
| With vector artwork | 425                                                  |
| Categories          | `information`, `prohibitory`, `warning`              |
| Standard            | ΚΟΚ (Κώδικας Οδικής Κυκλοφορίας) — Vienna Convention |
| Regulator           | Greek Ministry of Infrastructure                     |
| Drive side          | right-hand                                           |
| Language(s)         | Greek                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/gr';

signs; // the whole registry
getSign('1-curve-left-1-curve-left'); // by slug id
getSignByCode('1-curve-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-curve-left-1-curve-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **19 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Greece are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/gr/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Greece](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Greece)

## Notes

Codes use romanized ΚΟΚ series: K (warning), R (prohibitory), P (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/gr)

## License

MIT © Karl Norling
