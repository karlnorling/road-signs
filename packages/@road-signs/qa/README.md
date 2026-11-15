# @road-signs/qa

Road signs for Qatar — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/qa
```

## At a glance

|                     |                                                          |
| ------------------- | -------------------------------------------------------- |
| Signs               | 202                                                      |
| With vector artwork | 202                                                      |
| Categories          | `information`, `prohibitory`, `warning`                  |
| Standard            | Vienna Convention, bilingual Arabic/English (GCC Manual) |
| Regulator           | Ashghal (GCC Manual)                                     |
| Drive side          | right-hand                                               |
| Language(s)         | Arabic, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/qa';

signs; // the whole registry
getSign('stop-sign-ahead-stop-sign-ahead'); // by slug id
getSignByCode('stop-sign-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('stop-sign-ahead-stop-sign-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Qatar](https://en.wikipedia.org/wiki/Road_signs_in_Qatar)
- [Wikimedia Commons — SVG road signs in Qatar](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Qatar)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/qa)

## License

MIT © Karl Norling
