# @road-signs/do

Road signs for Dominican Republic — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/do
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 51                                           |
| With vector artwork | 51                                           |
| Categories          | `information`                                |
| Standard            | MUTCD-influenced / Vienna Convention variant |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/do';

signs; // the whole registry
getSign('o-11-dominican-republic-road-sign'); // by slug id
getSignByCode('O-11'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('o-11-dominican-republic-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in the Dominican Republic](https://en.wikipedia.org/wiki/Road_signs_in_the_Dominican_Republic)
- [Wikimedia Commons — SVG road signs in the Dominican Republic](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Dominican_Republic)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/do)

## License

MIT © Karl Norling
