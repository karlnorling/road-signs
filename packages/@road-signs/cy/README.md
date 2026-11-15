# @road-signs/cy

Road signs for Cyprus — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/cy
```

## At a glance

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| Signs               | 153                                             |
| With vector artwork | 153                                             |
| Categories          | `information`, `prohibitory`, `warning`         |
| Standard            | Road Traffic Law (Cap. 332) — Vienna Convention |
| Regulator           | Road Transport Department                       |
| Drive side          | left-hand                                       |
| Language(s)         | Greek, Turkish, English                         |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cy';

signs; // the whole registry
getSign('traffic-signals-ahead-traffic-signals-ahead'); // by slug id
getSignByCode('traffic-signals-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('traffic-signals-ahead-traffic-signals-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Cyprus](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cyprus)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cy)

## License

MIT © Karl Norling
