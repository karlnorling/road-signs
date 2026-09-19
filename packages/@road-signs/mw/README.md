# @road-signs/mw

Road signs for Malawi — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

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

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/mw/dist/sprite.css" />
<span class="rs-mw-w309-sadc-road-sign" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/mw/dist/sprite.svg#rs-mw-w309-sadc-road-sign" />
</svg>
```

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
