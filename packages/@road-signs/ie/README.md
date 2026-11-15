# @road-signs/ie

Road signs for Ireland — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ie
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 299                                                 |
| With vector artwork | 299                                                 |
| Categories          | `information`, `prohibitory`, `warning`             |
| Standard            | Road Traffic (Signs) Regulations — TSRGD-influenced |
| Regulator           | RSA (TSM)                                           |
| Drive side          | left-hand                                           |
| Language(s)         | English, Irish                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ie';

signs; // the whole registry
getSign('w-001-crossroads-w-001-crossroads'); // by slug id
getSignByCode('w-001-crossroads'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w-001-crossroads-w-001-crossroads')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Ireland](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ireland)
- [Wikimedia Commons — SVG road signs in Ireland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ireland)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ie)

## License

MIT © Karl Norling
