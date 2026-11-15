# @road-signs/kh

Road signs for Cambodia — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/kh
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 465                                                              |
| With vector artwork | 455                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (Prakas on Road Signs 2014)                    |
| Regulator           | MPWT                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Khmer                                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kh';

signs; // the whole registry
getSign('other-danger-other-danger'); // by slug id
getSignByCode('other-danger'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('other-danger-other-danger')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **10 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Cambodia are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/kh/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Cambodia](https://en.wikipedia.org/wiki/Road_signs_in_Cambodia)
- [Wikimedia Commons — SVG road signs in Cambodia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cambodia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kh)

## License

MIT © Karl Norling
