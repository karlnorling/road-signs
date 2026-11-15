# @road-signs/lk

Road signs for Sri Lanka — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/lk
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 184                                                              |
| With vector artwork | 184                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | British-derived (Motor Traffic Act)                              |
| Regulator           | RDA                                                              |
| Drive side          | left-hand                                                        |
| Language(s)         | Sinhala, Tamil, English                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lk';

signs; // the whole registry
getSign('curve-to-the-left-curve-to-the-left'); // by slug id
getSignByCode('curve-to-the-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-left-curve-to-the-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Sri Lanka](https://en.wikipedia.org/wiki/Road_signs_in_Sri_Lanka)
- [Wikimedia Commons — SVG road signs in Sri Lanka](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sri_Lanka)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lk)

## License

MIT © Karl Norling
