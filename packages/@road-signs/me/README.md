# @road-signs/me

Road signs for Montenegro — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/me
```

## At a glance

|                     |                                                                 |
| ------------------- | --------------------------------------------------------------- |
| Signs               | 273                                                             |
| With vector artwork | 273                                                             |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`            |
| Standard            | Zakon o bezbjednosti saobraćaja na putevima — Vienna Convention |
| Regulator           | Auto-moto savez Crne Gore                                       |
| Drive side          | right-hand                                                      |
| Language(s)         | Montenegrin                                                     |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/me';

signs; // the whole registry
getSign('i-1-left-curve'); // by slug id
getSignByCode('I-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('i-1-left-curve')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Montenegro](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Montenegro)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/me)

## License

MIT © Karl Norling
