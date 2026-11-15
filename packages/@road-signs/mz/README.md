# @road-signs/mz

Road signs for Mozambique — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mz
```

## At a glance

|                     |                                           |
| ------------------- | ----------------------------------------- |
| Signs               | 45                                        |
| With vector artwork | 45                                        |
| Categories          | `mandatory`                               |
| Standard            | Vienna Convention / Portuguese-influenced |
| Regulator           | INATTER                                   |
| Drive side          | left-hand                                 |
| Language(s)         | Portuguese                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mz';

signs; // the whole registry
getSign('r101-600-sadc-road-sign'); // by slug id
getSignByCode('R101-600'); // by official code
getSignsByCategory('mandatory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('r101-600-sadc-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Mozambique](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mozambique)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mz)

## License

MIT © Karl Norling
