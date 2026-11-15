# @road-signs/ph

Road signs for Philippines — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ph
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 435                                                              |
| With vector artwork | 435                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (original signatory)                           |
| Regulator           | DPWH                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Filipino, English                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ph';

signs; // the whole registry
getSign('sharp-turn-right-sharp-turn-right'); // by slug id
getSignByCode('sharp-turn-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('sharp-turn-right-sharp-turn-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in the Philippines](https://en.wikipedia.org/wiki/Road_signs_in_the_Philippines)
- [Wikimedia Commons — SVG road signs in the Philippines](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Philippines)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ph)

## License

MIT © Karl Norling
