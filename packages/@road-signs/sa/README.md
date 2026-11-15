# @road-signs/sa

Road signs for Saudi Arabia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/sa
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 192                                                 |
| With vector artwork | 192                                                 |
| Categories          | `information`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention, bilingual Arabic/English         |
| Regulator           | GDT (GCC Manual)                                    |
| Drive side          | right-hand                                          |
| Language(s)         | Arabic, English                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sa';

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

- [Wikipedia — Road signs in Saudi Arabia](https://en.wikipedia.org/wiki/Road_signs_in_Saudi_Arabia)
- [Wikimedia Commons — SVG road signs in Saudi Arabia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Saudi_Arabia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sa)

## License

MIT © Karl Norling
