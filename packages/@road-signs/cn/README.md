# @road-signs/cn

Road signs for China — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/cn
```

## At a glance

|                     |                                         |
| ------------------- | --------------------------------------- |
| Signs               | 421                                     |
| With vector artwork | 421                                     |
| Categories          | `information`, `prohibitory`, `warning` |
| Standard            | GB 5768 national standard (non-Vienna)  |
| Regulator           | MPS (GB 5768)                           |
| Drive side          | right-hand                              |
| Language(s)         | Chinese                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cn';

signs; // the whole registry
getSign('intersection-intersection'); // by slug id
getSignByCode('intersection'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('intersection-intersection')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in China](https://en.wikipedia.org/wiki/Road_signs_in_China)
- [Wikimedia Commons — SVG road signs in China](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_China)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cn)

## License

MIT © Karl Norling
