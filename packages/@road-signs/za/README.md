# @road-signs/za

Road signs for South Africa — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/za
```

## At a glance

|                     |                                                  |
| ------------------- | ------------------------------------------------ |
| Signs               | 322                                              |
| With vector artwork | 321                                              |
| Categories          | `information`, `prohibitory`, `warning`          |
| Standard            | SARTSM (South African Road Traffic Signs Manual) |
| Regulator           | SARTSM                                           |
| Drive side          | left-hand                                        |
| Language(s)         | English, Afrikaans                               |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/za';

signs; // the whole registry
getSign('crossroad-ahead-crossroad-ahead'); // by slug id
getSignByCode('crossroad-ahead'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('crossroad-ahead-crossroad-ahead')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **1 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for South Africa are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/za/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — SVG road signs in South Africa](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Africa)
- [Wikimedia Commons — Road signs in South Africa](https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Africa)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/za)

## License

MIT © Karl Norling
