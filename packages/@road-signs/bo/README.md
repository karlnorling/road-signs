# @road-signs/bo

Road signs for Bolivia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/bo
```

## At a glance

|                     |                                           |
| ------------------- | ----------------------------------------- |
| Signs               | 53                                        |
| With vector artwork | 53                                        |
| Categories          | `information`                             |
| Standard            | Manual de Señalización Vial (SIECA-based) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bo';

signs; // the whole registry
getSign('sp-1-bo-road-sign'); // by slug id
getSignByCode('SP-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('sp-1-bo-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Bolivia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bolivia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bo)

## License

MIT © Karl Norling
