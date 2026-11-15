# @road-signs/be

Road signs for Belgium — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/be
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 113                                                              |
| With vector artwork | 111                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Code de la route / Verkeersreglement — Vienna Convention         |
| Regulator           | SPF Mobilité                                                     |
| Drive side          | right-hand                                                       |
| Language(s)         | Dutch, French, German                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/be';

signs; // the whole registry
getSign('a1a-a1a-bend-to-the-left'); // by slug id
getSignByCode('A1A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a1a-a1a-bend-to-the-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **2 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Belgium are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/be/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Belgium](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belgium)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/be)

## License

MIT © Karl Norling
