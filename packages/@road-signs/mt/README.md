# @road-signs/mt

Road signs for Malta — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mt
```

## At a glance

|                     |                                                    |
| ------------------- | -------------------------------------------------- |
| Signs               | 81                                                 |
| With vector artwork | 81                                                 |
| Categories          | `information`, `prohibitory`, `warning`            |
| Standard            | Traffic Ordinance (Chapter 65) — Vienna Convention |
| Regulator           | Transport Malta                                    |
| Drive side          | left-hand                                          |
| Language(s)         | Maltese, English                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mt';

signs; // the whole registry
getSign('bend-to-the-left-also-uses-bend-to-the-left-also-uses'); // by slug id
getSignByCode('bend-to-the-left-also-uses'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('bend-to-the-left-also-uses-bend-to-the-left-also-uses')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Malta](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Malta)
- [Wikimedia Commons — Road signs in Malta (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Malta)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mt)

## License

MIT © Karl Norling
