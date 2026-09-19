# @road-signs/br

Road signs for Brazil — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/br
```

## At a glance

|                     |                                                                 |
| ------------------- | --------------------------------------------------------------- |
| Signs               | 171                                                             |
| With vector artwork | 171                                                             |
| Categories          | `prohibitory`, `warning`                                        |
| Standard            | CTB (Código de Trânsito Brasileiro) — Vienna Convention variant |
| Regulator           | CONTRAN (CTB)                                                   |
| Drive side          | right-hand                                                      |
| Language(s)         | Portuguese                                                      |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/br';

signs; // the whole registry
getSign('a-1a-sharp-curve-to-left'); // by slug id
getSignByCode('A-1A'); // by official code
getSignsByCategory('prohibitory'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a-1a-sharp-curve-to-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/br/dist/sprite.css" />
<span
  class="rs-br-a-1a-sharp-curve-to-left"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/br/dist/sprite.svg#rs-br-a-1a-sharp-curve-to-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Brazil](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Brazil)
- [Wikimedia Commons — SVG road signs in Brazil](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brazil)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/br)

## License

MIT © Karl Norling
