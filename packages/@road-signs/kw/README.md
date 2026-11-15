# @road-signs/kw

Road signs for Kuwait — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/kw
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 98                                                       |
| With vector artwork | 98                                                       |
| Categories          | `information`, `prohibitory`, `warning`                  |
| Standard            | Vienna Convention, bilingual Arabic/English (GCC Manual) |
| Regulator           | GCC Manual                                               |
| Drive side          | right-hand                                               |
| Language(s)         | Arabic, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kw';

signs; // the whole registry
getSign('kw-road-sign-500-kw-road-sign-500'); // by slug id
getSignByCode('kw-road-sign-500'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('kw-road-sign-500-kw-road-sign-500')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Kuwait](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kuwait)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kw)

## License

MIT © Karl Norling
