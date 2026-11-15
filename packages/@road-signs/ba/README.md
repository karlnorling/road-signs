# @road-signs/ba

Road signs for Bosnia and Herzegovina — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ba
```

## At a glance

|                     |                                                                         |
| ------------------- | ----------------------------------------------------------------------- |
| Signs               | 298                                                                     |
| With vector artwork | 298                                                                     |
| Categories          | `information`, `prohibitory`, `warning`                                 |
| Standard            | Zakon o osnovama bezbjednosti saobraćaja na cestama — Vienna Convention |
| Regulator           | BIHAMK                                                                  |
| Drive side          | right-hand                                                              |
| Language(s)         | Bosnian, Croatian, Serbian                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ba';

signs; // the whole registry
getSign('curve-to-left-curve-to-left'); // by slug id
getSignByCode('curve-to-left'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-left-curve-to-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Bosnia and Herzegovina](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bosnia_and_Herzegovina)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ba)

## License

MIT © Karl Norling
