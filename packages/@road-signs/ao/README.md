# @road-signs/ao

Road signs for Angola — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/ao
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 158                                                              |
| With vector artwork | 158                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention / Portuguese-influenced (Código da Estrada)    |
| Regulator           | INSTT                                                            |
| Drive side          | right-hand                                                       |
| Language(s)         | Portuguese                                                       |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ao';

signs; // the whole registry
getSign('dangerous-curve-to-right'); // by slug id
getSignByCode('dangerous-curve-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('dangerous-curve-to-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/ao/dist/sprite.css" />
<span
  class="rs-ao-dangerous-curve-to-right"
  style="display:inline-block;width:64px;height:64px"
></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/ao/dist/sprite.svg#rs-ao-dangerous-curve-to-right" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Angola](https://en.wikipedia.org/wiki/Road_signs_in_Angola)
- [Wikimedia Commons — SVG road signs in Angola](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Angola)

## Notes

No SVG assets currently on Wikimedia Commons. Angola uses a Portuguese-influenced sign system based on the Vienna Convention with codes A (warning), B (priority), C (prohibition), D (mandatory), H/M (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ao)

## License

MIT © Karl Norling
