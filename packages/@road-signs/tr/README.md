# @road-signs/tr

Road signs for Turkey — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/tr
```

## At a glance

|                     |                                                            |
| ------------------- | ---------------------------------------------------------- |
| Signs               | 155                                                        |
| With vector artwork | 155                                                        |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`       |
| Standard            | Karayolları Trafik Yönetmeliği — Vienna Convention variant |
| Regulator           | KGM                                                        |
| Drive side          | right-hand                                                 |
| Language(s)         | Turkish                                                    |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/tr';

signs; // the whole registry
getSign('curve-to-the-right-curve-to-the-right'); // by slug id
getSignByCode('curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-right-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Turkey](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Turkey)
- [Wikimedia Commons — Road signs in Turkey (general)](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Turkey)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/tr)

## License

MIT © Karl Norling
