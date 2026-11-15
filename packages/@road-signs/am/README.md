# @road-signs/am

Road signs for Armenia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/am
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 173                                                              |
| With vector artwork | 173                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (ՀՀ ճանապարհային նշաններ)                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/am';

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

- [Wikipedia — Road signs in Armenia](https://en.wikipedia.org/wiki/Road_signs_in_Armenia)
- [Wikimedia Commons — SVG road signs in Armenia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Armenia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/am)

## License

MIT © Karl Norling
