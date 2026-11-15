# @road-signs/mw

Road signs for Malawi — a TypeScript registry with every sign's artwork inlined as SVG, plus typed lookup helpers.

## Install

```sh
npm install @road-signs/mw
```

## At a glance

|                     |                                           |
| ------------------- | ----------------------------------------- |
| Signs               | 46                                        |
| With vector artwork | 46                                        |
| Categories          | `mandatory`, `warning`                    |
| Standard            | SADC regional standard (Road Traffic Act) |
| Regulator           | Directorate of Road Traffic               |
| Drive side          | left-hand                                 |
| Language(s)         | English                                   |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mw';

signs; // the whole registry
getSign('w309-sadc-road-sign'); // by slug id
getSignByCode('W309'); // by official code
getSignsByCategory('mandatory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('w309-sadc-road-sign')!;

sign.svg; // inline, SVGO-optimised SVG markup
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> render from `sign.svg` instead.

## Sources

- [Wikipedia — Road signs in the Southern African Development Community](https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community)
- [Wikimedia Commons — SVG road signs in the Southern African Development Community](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community)

## Notes

Malawi uses the SADC regional sign standard. No Malawi-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mw)

## License

MIT © Karl Norling
