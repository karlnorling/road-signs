# @road-signs/rs

Road signs for Serbia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/rs
```

## At a glance

|                     |                                                                |
| ------------------- | -------------------------------------------------------------- |
| Signs               | 234                                                            |
| With vector artwork | 234                                                            |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`           |
| Standard            | Zakon o bezbednosti saobraćaja na putevima — Vienna Convention |
| Regulator           | AMSS                                                           |
| Drive side          | right-hand                                                     |
| Language(s)         | Serbian                                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/rs';

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

- [Wikimedia Commons — Road signs in Serbia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Serbia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/rs)

## License

MIT © Karl Norling
