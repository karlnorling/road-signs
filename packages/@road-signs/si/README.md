# @road-signs/si

Road signs for Slovenia — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/si
```

## At a glance

|                     |                                                        |
| ------------------- | ------------------------------------------------------ |
| Signs               | 183                                                    |
| With vector artwork | 181                                                    |
| Categories          | `information`, `mandatory`, `priority`, `warning`      |
| Standard            | Pravilnik o prometni signalizaciji — Vienna Convention |
| Regulator           | DRSI                                                   |
| Drive side          | right-hand                                             |
| Language(s)         | Slovenian                                              |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/si';

signs; // the whole registry
getSign('i-1-curve-to-the-left'); // by slug id
getSignByCode('I-1'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('i-1-curve-to-the-left')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **2 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Slovenia are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/si/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Slovenia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovenia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/si)

## License

MIT © Karl Norling
