# @road-signs/kg

Road signs for Kyrgyzstan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/kg
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 157                                                              |
| With vector artwork | 157                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kg';

signs; // the whole registry
getSign('railroad-crossing-ahead-railroad-crossing-ahead'); // by slug id
getSignByCode('railroad-crossing-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('railroad-crossing-ahead-railroad-crossing-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Kyrgyzstan](https://en.wikipedia.org/wiki/Road_signs_in_Kyrgyzstan)
- [Wikimedia Commons — SVG road signs in Kyrgyzstan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kyrgyzstan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kg)

## License

MIT © Karl Norling
