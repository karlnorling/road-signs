# @road-signs/dk

Road signs for Denmark — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/dk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 290                                                              |
| With vector artwork | 290                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Færdselsloven — Vienna Convention                                |
| Regulator           | Vejdirektoratet                                                  |
| Drive side          | right-hand                                                       |
| Language(s)         | Danish                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/dk';

signs; // the whole registry
getSign('a11-dangerous-junction-with-a-non-priority-road-variants-and'); // by slug id
getSignByCode('A11'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a11-dangerous-junction-with-a-non-priority-road-variants-and')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Denmark](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Denmark)
- [Wikimedia Commons — Road signs in Denmark (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Denmark)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/dk)

## License

MIT © Karl Norling
