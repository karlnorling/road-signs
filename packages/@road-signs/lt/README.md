# @road-signs/lt

Road signs for Lithuania — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/lt
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 229                                                              |
| With vector artwork | 229                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Kelių eismo taisyklės — Vienna Convention                        |
| Regulator           | LAKD                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Lithuanian                                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lt';

signs; // the whole registry
getSign('level-crossing-ahead-with-gates-level-crossing-ahead-with-gates'); // by slug id
getSignByCode('level-crossing-ahead-with-gates'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('level-crossing-ahead-with-gates-level-crossing-ahead-with-gates')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Lithuania](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Lithuania)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lt)

## License

MIT © Karl Norling
