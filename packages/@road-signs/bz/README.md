# @road-signs/bz

Road signs for Belize — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/bz
```

## At a glance

|                     |                                                |
| ------------------- | ---------------------------------------------- |
| Signs               | 8                                              |
| With vector artwork | 8                                              |
| Categories          | `information`                                  |
| Standard            | UK-influenced / SIECA (Manual Centroamericano) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bz';

signs; // the whole registry
getSign('e1-1-sieca-road-sign-assembly-e3-3'); // by slug id
getSignByCode('E1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('e1-1-sieca-road-sign-assembly-e3-3')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Belize](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belize)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bz)

## License

MIT © Karl Norling
