# @road-signs/pl

Road signs for Poland — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/pl
```

## At a glance

|                     |                                                      |
| ------------------- | ---------------------------------------------------- |
| Signs               | 415                                                  |
| With vector artwork | 415                                                  |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning` |
| Standard            | Prawo o ruchu drogowym — Vienna Convention           |
| Regulator           | GDDKiA                                               |
| Drive side          | right-hand                                           |
| Language(s)         | Polish                                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pl';

signs; // the whole registry
getSign('a-1-dangerous-curve-to-the-right'); // by slug id
getSignByCode('A-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a-1-dangerous-curve-to-the-right')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Poland](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Poland)

## Notes

Several code series (A–W) scraped from Wikipedia lack matching SVG assets on Commons.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pl)

## License

MIT © Karl Norling
