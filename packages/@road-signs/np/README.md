# @road-signs/np

Road signs for Nepal — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/np
```

## At a glance

|                     |                                         |
| ------------------- | --------------------------------------- |
| Signs               | 118                                     |
| With vector artwork | 118                                     |
| Categories          | `information`, `prohibitory`, `warning` |
| Standard            | British-derived (Department of Roads)   |
| Regulator           | DoTM                                    |
| Drive side          | left-hand                               |
| Language(s)         | Nepali                                  |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/np';

signs; // the whole registry
getSign('b1-crossroads-with-a-minor-ahead'); // by slug id
getSignByCode('B1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('b1-crossroads-with-a-minor-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Nepal](https://en.wikipedia.org/wiki/Road_signs_in_Nepal)
- [Wikimedia Commons — SVG road signs in Nepal](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nepal)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/np)

## License

MIT © Karl Norling
