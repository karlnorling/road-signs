# @road-signs/py

Road signs for Paraguay — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/py
```

## At a glance

|                     |                                                         |
| ------------------- | ------------------------------------------------------- |
| Signs               | 146                                                     |
| With vector artwork | 146                                                     |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`    |
| Standard            | Manual de Señalización Vial — Vienna Convention variant |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/py';

signs; // the whole registry
getSign('p-01-sharp-curve-to-the-left'); // by slug id
getSignByCode('P-01'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('p-01-sharp-curve-to-the-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Paraguay](https://en.wikipedia.org/wiki/Road_signs_in_Paraguay)
- [Wikimedia Commons — SVG road signs in Paraguay](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Paraguay)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/py)

## License

MIT © Karl Norling
