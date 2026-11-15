# @road-signs/id

Road signs for Indonesia — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/id
```

## At a glance

|                     |                                                                 |
| ------------------- | --------------------------------------------------------------- |
| Signs               | 295                                                             |
| With vector artwork | 210                                                             |
| Categories          | `information`, `mandatory`, `prohibitory`, `warning`            |
| Standard            | Vienna Convention based (Minister of Transport Regulation 2014) |
| Regulator           | Ministry of Transportation                                      |
| Drive side          | left-hand                                                       |
| Language(s)         | Indonesian                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/id';

signs; // the whole registry
getSign('bend-bend'); // by slug id
getSignByCode('bend'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('bend-bend')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **85 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Indonesia are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/id/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in Indonesia](https://en.wikipedia.org/wiki/Road_signs_in_Indonesia)
- [Wikimedia Commons — SVG road signs in Indonesia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Indonesia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/id)

## License

MIT © Karl Norling
