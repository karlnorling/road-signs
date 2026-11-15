# @road-signs/ir

Road signs for Iran — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/ir
```

## At a glance

|                     |                                                        |
| ------------------- | ------------------------------------------------------ |
| Signs               | 51                                                     |
| With vector artwork | 51                                                     |
| Categories          | `information`, `mandatory`, `warning`                  |
| Standard            | Vienna Convention adjacent (Road Signs Manual of Iran) |
| Regulator           | Ministry of Roads & Urban Development                  |
| Drive side          | right-hand                                             |
| Language(s)         | Persian                                                |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ir';

signs; // the whole registry
getSign('avenue-in-iran-avenue-in-iran'); // by slug id
getSignByCode('avenue-in-iran'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('avenue-in-iran-avenue-in-iran')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Iran](https://en.wikipedia.org/wiki/Road_signs_in_Iran)
- [Wikimedia Commons — SVG road signs in Iran](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iran)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ir)

## License

MIT © Karl Norling
