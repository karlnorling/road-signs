# @road-signs/cr

Road signs for Costa Rica — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/cr
```

## At a glance

|                     |                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Signs               | 417                                                                                                               |
| With vector artwork | 417                                                                                                               |
| Categories          | `information`, `prohibitory`, `warning`                                                                           |
| Standard            | Manual Centroamericano de Dispositivos Uniformes para el Control del Tránsito (SIECA) — Vienna Convention variant |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cr';

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

- [Wikipedia — Road signs in Costa Rica](https://en.wikipedia.org/wiki/Road_signs_in_Costa_Rica)
- [Wikimedia Commons — Road signs in Costa Rica](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Costa_Rica)
- [Wikimedia Commons — Road signs in Costa Rica (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Costa_Rica)

## Notes

Follows the Central American SIECA manual. Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cr)

## License

MIT © Karl Norling
