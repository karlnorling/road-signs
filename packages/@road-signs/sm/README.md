# @road-signs/sm

Road signs for San Marino — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

> San Marino is fully integrated into Italy's sign system, so this package
> re-exports [`@road-signs/it`](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/it)
> rather than shipping a duplicate catalogue. The signs below are Italy's.

## Install

```sh
npm install @road-signs/sm
```

## At a glance

|                     |                                                             |
| ------------------- | ----------------------------------------------------------- |
| Signs               | 326                                                         |
| With vector artwork | 317                                                         |
| Categories          | `information`, `prohibitory`, `warning`                     |
| Standard            | Vienna Convention (Codice della strada) — shared with Italy |
| Regulator           | Italian Codice della Strada                                 |
| Drive side          | right-hand                                                  |
| Language(s)         | Italian                                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sm';

signs; // the whole registry
getSign(
  'uneven-road-formerly-used-that-meant-humps-or-dip-uneven-road-formerly-used-that-meant-humps-or-dip',
); // by slug id
getSignByCode('uneven-road-formerly-used-that-meant-humps-or-dip'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  'uneven-road-formerly-used-that-meant-humps-or-dip-uneven-road-formerly-used-that-meant-humps-or-dip',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **9 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for San Marino are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/sm/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in San Marino](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_San_Marino)
- [Wikimedia Commons — Diagrams of road signs of San Marino](https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_San_Marino)
- [Segreteria di Stato per il Territorio e l'Ambiente (road authority)](https://www.gov.sm/pub/Siti/SSTA/home.html)

## Notes

San Marino uses the Italian sign system (Codice della strada) without country-specific variants. SVG assets on Wikimedia Commons are very limited. Italian sign packages (IT) provide comprehensive coverage of the shared sign set.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sm)

## License

MIT © Karl Norling
