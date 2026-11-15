# @road-signs/om

Road signs for Oman — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/om
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 136                                                      |
| With vector artwork | 136                                                      |
| Categories          | `information`, `prohibitory`, `warning`                  |
| Standard            | Vienna Convention, bilingual Arabic/English (GCC Manual) |
| Regulator           | ROP (GCC Manual)                                         |
| Drive side          | right-hand                                               |
| Language(s)         | Arabic, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/om';

signs; // the whole registry
getSign('om-road-sign-101-om-road-sign-101'); // by slug id
getSignByCode('om-road-sign-101'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('om-road-sign-101-om-road-sign-101')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Oman](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Oman)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/om)

## License

MIT © Karl Norling
