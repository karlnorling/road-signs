# @road-signs/mm

Road signs for Myanmar — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mm
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 233                                                              |
| With vector artwork | 233                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention / UK-influenced                                |
| Regulator           | Ministry of Construction                                         |
| Drive side          | right-hand                                                       |
| Language(s)         | Burmese                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mm';

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

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Myanmar](https://en.wikipedia.org/wiki/Road_signs_in_Myanmar)
- [Wikimedia Commons — SVG road signs in Myanmar](https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Myanmar)

## Notes

Limited SVG coverage on Wikimedia Commons for Myanmar.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mm)

## License

MIT © Karl Norling
