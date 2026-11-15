# @road-signs/ee

Road signs for Estonia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ee
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 151                                                              |
| With vector artwork | 151                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Liiklusseadus — Vienna Convention                                |
| Regulator           | Transpordiamet                                                   |
| Drive side          | right-hand                                                       |
| Language(s)         | Estonian                                                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ee';

signs; // the whole registry
getSign('level-crossing-with-gates-level-crossing-with-gates'); // by slug id
getSignByCode('level-crossing-with-gates'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('level-crossing-with-gates-level-crossing-with-gates')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Estonia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Estonia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ee)

## License

MIT © Karl Norling
