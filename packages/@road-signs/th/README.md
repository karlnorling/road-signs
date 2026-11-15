# @road-signs/th

Road signs for Thailand — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/th
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 444                                                              |
| With vector artwork | 444                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Land Traffic Act (พระราชบัญญัติจราจรทางบก)                          |
| Regulator           | DOH                                                              |
| Drive side          | left-hand                                                        |
| Language(s)         | Thai                                                             |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/th';

signs; // the whole registry
getSign('curve-to-left-curve-to-left'); // by slug id
getSignByCode('curve-to-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-left-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Thailand](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Thailand)
- [Wikimedia Commons — SVG road signs in Thailand](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Thailand)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/th)

## License

MIT © Karl Norling
