# @road-signs/fi

Road signs for Finland — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/fi
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 445                                                              |
| With vector artwork | 401                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Tieliikennelaki — Vienna Convention                              |
| Regulator           | Traficom                                                         |
| Drive side          | right-hand                                                       |
| Language(s)         | Finnish, Swedish                                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/fi';

signs; // the whole registry
getSign('dangerous-curve-to-right-formerly-used-dangerous-curve-to-right-formerly-used'); // by slug id
getSignByCode('dangerous-curve-to-right-formerly-used'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  'dangerous-curve-to-right-formerly-used-dangerous-curve-to-right-formerly-used',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **44 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Finland are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/fi/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Finland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Finland)

## Notes

Codes are 3-digit numeric: 111–199 (warning), 211–299 (priority), 311–399 (prohibitory), 411–499 (mandatory), 511+ (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/fi)

## License

MIT © Karl Norling
