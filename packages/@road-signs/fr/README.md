# @road-signs/fr

Road signs for France — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/fr
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 323                                                 |
| With vector artwork | 320                                                 |
| Categories          | `information`, `priority`, `prohibitory`, `warning` |
| Standard            | Code de la route — Vienna Convention                |
| Regulator           | Sécurité Routière                                   |
| Drive side          | right-hand                                          |
| Language(s)         | French                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/fr';

signs; // the whole registry
getSign('bend-to-right-bend-to-right'); // by slug id
getSignByCode('bend-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('bend-to-right-bend-to-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **3 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for France are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/fr/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in France](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_France)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/fr)

## License

MIT © Karl Norling
