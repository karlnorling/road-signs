# @road-signs/va

Road signs for Vatican City — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

> Vatican City is fully integrated into Italy's sign system, so this package
> re-exports [`@road-signs/it`](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/it)
> rather than shipping a duplicate catalogue. The signs below are Italy's.

## Install

```sh
npm install @road-signs/va
```

## At a glance

|                     |                                                               |
| ------------------- | ------------------------------------------------------------- |
| Signs               | 326                                                           |
| With vector artwork | 326                                                           |
| Categories          | `information`, `prohibitory`, `warning`                       |
| Standard            | Italian Codice della Strada (re-exported from @road-signs/it) |
| Regulator           | Italian Codice della Strada (de facto)                        |
| Drive side          | right-hand                                                    |
| Language(s)         | Italian, Latin                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/va';

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

- [Wikipedia — Road signs in Italy (Vatican uses the Italian system)](https://en.wikipedia.org/wiki/Road_signs_in_Italy)

## Notes

Vatican City is fully integrated into the Italian road-sign system. @road-signs/va re-exports @road-signs/it.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/va)

## License

MIT © Karl Norling
