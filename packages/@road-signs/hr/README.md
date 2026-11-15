# @road-signs/hr

Road signs for Croatia — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/hr
```

## At a glance

|                     |                                                     |
| ------------------- | --------------------------------------------------- |
| Signs               | 337                                                 |
| With vector artwork | 337                                                 |
| Categories          | `information`, `priority`, `prohibitory`, `warning` |
| Standard            | Pravilnik o prometnim znakovima — Vienna Convention |
| Regulator           | HAK                                                 |
| Drive side          | right-hand                                          |
| Language(s)         | Croatian                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/hr';

signs; // the whole registry
getSign('a01-other-dangers'); // by slug id
getSignByCode('A01'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a01-other-dangers')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Croatia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Croatia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/hr)

## License

MIT © Karl Norling
