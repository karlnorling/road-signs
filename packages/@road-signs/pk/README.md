# @road-signs/pk

Road signs for Pakistan — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/pk
```

## At a glance

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Signs               | 166                                          |
| With vector artwork | 166                                          |
| Categories          | `information`, `prohibitory`, `warning`      |
| Standard            | British-derived (National Highway Authority) |
| Regulator           | NHA                                          |
| Drive side          | left-hand                                    |
| Language(s)         | Urdu, English                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pk';

signs; // the whole registry
getSign('dangerous-curve-to-the-right-dangerous-curve-to-the-right'); // by slug id
getSignByCode('dangerous-curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-the-right-dangerous-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Pakistan](https://en.wikipedia.org/wiki/Road_signs_in_Pakistan)
- [Wikimedia Commons — SVG road signs in Pakistan](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Pakistan)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pk)

## License

MIT © Karl Norling
