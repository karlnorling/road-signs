# @road-signs/it

Road signs for Italy — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/it
```

## At a glance

|                     |                                         |
| ------------------- | --------------------------------------- |
| Signs               | 326                                     |
| With vector artwork | 326                                     |
| Categories          | `information`, `prohibitory`, `warning` |
| Standard            | Codice della strada — Vienna Convention |
| Regulator           | MIT (Codice della Strada)               |
| Drive side          | right-hand                              |
| Language(s)         | Italian                                 |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/it';

signs; // the whole registry
getSign(
  'uneven-road-formerly-used-that-meant-humps-or-dip-uneven-road-formerly-used-that-meant-humps-or-dip',
); // by slug id
getSignByCode('uneven-road-formerly-used-that-meant-humps-or-dip'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  'uneven-road-formerly-used-that-meant-humps-or-dip-uneven-road-formerly-used-that-meant-humps-or-dip',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Italy](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Italy)

## Notes

Panel (A/B/P/Q series) and traffic light signs exist only as raster images on Wikipedia.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/it)

## License

MIT © Karl Norling
