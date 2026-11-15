# @road-signs/jo

Road signs for Jordan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/jo
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 4                                                        |
| With vector artwork | 4                                                        |
| Categories          | `prohibitory`                                            |
| Standard            | Vienna Convention, bilingual Arabic/English (GCC Manual) |
| Regulator           | Ministry of Public Works                                 |
| Drive side          | right-hand                                               |
| Language(s)         | Arabic, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/jo';

signs; // the whole registry
getSign('jordan-road-sign-r-30-jordan-road-sign-r-30'); // by slug id
getSignByCode('jordan-road-sign-r-30'); // by official code
getSignsByCategory('prohibitory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('jordan-road-sign-r-30-jordan-road-sign-r-30')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Jordan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Jordan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/jo)

## License

MIT © Karl Norling
