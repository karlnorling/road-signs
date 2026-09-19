# @road-signs/li

Road signs for Liechtenstein — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/li
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 251                                                              |
| With vector artwork | 251                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | SSV/SVV (Signalisationsverordnung) — same signs as Switzerland   |
| Regulator           | ASTRA (uses Swiss SSV)                                           |
| Drive side          | right-hand                                                       |
| Language(s)         | German                                                           |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/li';

signs; // the whole registry
getSign('1-01-bend-to-right'); // by slug id
getSignByCode('1-01-bend-to-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-01-bend-to-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/li/dist/sprite.css" />
<span class="rs-li-1-01-bend-to-right" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/li/dist/sprite.svg#rs-li-1-01-bend-to-right" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Liechtenstein](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Liechtenstein)
- [Wikimedia Commons — Road signs in Switzerland (shared)](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Switzerland)

## Notes

Liechtenstein uses identical signs to Switzerland. Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5–6.xx (information).

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/li)

## License

MIT © Karl Norling
