# @road-signs/mc

Road signs for Monaco — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/mc
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 334                                                              |
| With vector artwork | 334                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (Code de la route) — shared with France        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mc';

signs; // the whole registry
getSign('bend-to-right'); // by slug id
getSignByCode('bend-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('bend-to-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/mc/dist/sprite.css" />
<span class="rs-mc-bend-to-right" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/mc/dist/sprite.svg#rs-mc-bend-to-right" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in Monaco](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Monaco)
- [Wikimedia Commons — Diagrams of road signs of Monaco](https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Monaco)
- [Direction de la Sûreté Publique de Monaco](https://www.gouv.mc/Action-Gouvernementale/La-Securite-des-Personnes/La-Surete-Publique)

## Notes

Monaco uses the French sign system (Code de la route) without country-specific variants. SVG assets on Wikimedia Commons are limited to a small number of Monaco-specific signs. French sign packages (FR) provide comprehensive coverage of the shared sign set.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mc)

## License

MIT © Karl Norling
