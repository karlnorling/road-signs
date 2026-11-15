# @road-signs/ug

Road signs for Uganda — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ug
```

## At a glance

|                     |                                               |
| ------------------- | --------------------------------------------- |
| Signs               | 88                                            |
| With vector artwork | 88                                            |
| Categories          | `information`                                 |
| Standard            | British-derived (Traffic and Road Safety Act) |
| Regulator           | Ministry of Works and Transport               |
| Drive side          | left-hand                                     |
| Language(s)         | English                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ug';

signs; // the whole registry
getSign('g01-1-ug-road-sign'); // by slug id
getSignByCode('G01.1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('g01-1-ug-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Uganda](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uganda)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ug)

## License

MIT © Karl Norling
