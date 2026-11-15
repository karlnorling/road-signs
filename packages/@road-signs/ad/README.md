# @road-signs/ad

Road signs for Andorra — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ad
```

## At a glance

|                     |                                            |
| ------------------- | ------------------------------------------ |
| Signs               | 38                                         |
| With vector artwork | 38                                         |
| Categories          | `information`, `priority`                  |
| Standard            | Vienna Convention (Code de la circulation) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ad';

signs; // the whole registry
getSign('b2-andorra-traffic-signal-b2'); // by slug id
getSignByCode('B2'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('b2-andorra-traffic-signal-b2')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in Andorra](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Andorra)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ad)

## License

MIT © Karl Norling
