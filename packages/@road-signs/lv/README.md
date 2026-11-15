# @road-signs/lv

Road signs for Latvia — a TypeScript registry with most signs' artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/lv
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 224                                                              |
| With vector artwork | 223                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Ceļu satiksmes noteikumi — Vienna Convention                     |
| Regulator           | CSDD                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Latvian                                                          |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lv';

signs; // the whole registry
getSign(
  'crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right-crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right',
); // by slug id
getSignByCode('crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign(
  'crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right-crossroads-without-priority-give-way-to-the-vehicles-coming-from-the-right',
)!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> **1 of these signs carry inline artwork.**
> They have no usable vector source — either none was published upstream,
> or the only artwork is a monochrome trace that renders as a black shape.
> Vector sources for Latvia are welcome:
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/lv/).

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikimedia Commons — Road signs in Latvia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Latvia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lv)

## License

MIT © Karl Norling
