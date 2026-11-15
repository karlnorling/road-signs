# @road-signs/bd

Road signs for Bangladesh — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/bd
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 316                                                              |
| With vector artwork | 316                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (UK-influenced)                                |
| Regulator           | BRTA                                                             |
| Drive side          | left-hand                                                        |
| Language(s)         | Bengali, English                                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bd';

signs; // the whole registry
getSign('crossroad-with-a-minor-road-ahead-crossroad-with-a-minor-road-ahead'); // by slug id
getSignByCode('crossroad-with-a-minor-road-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-with-a-minor-road-ahead-crossroad-with-a-minor-road-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Bangladesh](https://en.wikipedia.org/wiki/Road_signs_in_Bangladesh)
- [Wikimedia Commons — SVG road signs in Bangladesh](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bangladesh)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bd)

## License

MIT © Karl Norling
