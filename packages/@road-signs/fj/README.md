# @road-signs/fj

Road signs for Fiji — a TypeScript registry with typed lookup helpers.

## Install

```sh
npm install @road-signs/fj
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 176                                                              |
| With vector artwork | 0                                                                |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | British-derived (Land Transport Act / MOTSAM)                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/fj';

signs; // the whole registry
getSign('rg-33-railway-level-crossing-flashing-light-signal'); // by slug id
getSignByCode('RG-33'); // by official code
getSignsByCategory('information'); // by category
```

> **No signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Fiji are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/fj/).

## Sources

- [Wikimedia Commons — SVG road signs in Fiji](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Fiji)
- [Fiji Roads Authority — MOTSAM documents](https://www.fijiroads.org/index.php/motsam-documents/)
- [Land Transport Authority Fiji](https://www.lta.gov.fj/)

## Notes

No SVG assets currently on Wikimedia Commons. Official sign specifications are published in the Fiji Roads Authority MOTSAM (Manual of Traffic Signs and Markings / Fiji Supplement to Austroads), available as PDF sections on the Fiji Roads Authority website.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/fj)

## License

MIT © Karl Norling
