# @road-signs/sv

Road signs for El Salvador — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/sv
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 420                                                      |
| With vector artwork | 420                                                      |
| Categories          | `information`, `prohibitory`, `warning`                  |
| Standard            | Manual Centroamericano de Dispositivos Uniformes (SIECA) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sv';

signs; // the whole registry
getSign('p-1-1-sharp-curve-to-the-right-left-if-reversed'); // by slug id
getSignByCode('P-1-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('p-1-1-sharp-curve-to-the-right-left-if-reversed')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in El Salvador](https://en.wikipedia.org/wiki/Road_signs_in_El_Salvador)
- [Wikimedia Commons — SVG road signs in El Salvador](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_El_Salvador)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sv)

## License

MIT © Karl Norling
