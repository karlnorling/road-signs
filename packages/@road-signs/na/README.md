# @road-signs/na

Road signs for Namibia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/na
```

## At a glance

|                     |                                                        |
| ------------------- | ------------------------------------------------------ |
| Signs               | 45                                                     |
| With vector artwork | 45                                                     |
| Categories          | `mandatory`                                            |
| Standard            | South African-derived (Road Traffic and Transport Act) |
| Regulator           | Roads Authority                                        |
| Drive side          | left-hand                                              |
| Language(s)         | English                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/na';

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

- [Wikimedia Commons — SVG road signs in Namibia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Namibia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/na)

## License

MIT © Karl Norling
