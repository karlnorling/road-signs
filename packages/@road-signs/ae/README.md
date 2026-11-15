# @road-signs/ae

Road signs for United Arab Emirates — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ae
```

## At a glance

|                     |                                           |
| ------------------- | ----------------------------------------- |
| Signs               | 169                                       |
| With vector artwork | 169                                       |
| Categories          | `information`, `prohibitory`, `warning`   |
| Standard            | British-derived, bilingual Arabic/English |
| Regulator           | RTA                                       |
| Drive side          | right-hand                                |
| Language(s)         | Arabic, English                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ae';

signs; // the whole registry
getSign('crossroads-crossroads'); // by slug id
getSignByCode('crossroads'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroads-crossroads')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in the UAE](https://en.wikipedia.org/wiki/Road_signs_in_the_United_Arab_Emirates)
- [Wikimedia Commons — SVG road signs in the UAE](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Arab_Emirates)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ae)

## License

MIT © Karl Norling
