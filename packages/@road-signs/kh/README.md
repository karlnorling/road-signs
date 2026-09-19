# @road-signs/kh

Road signs for Cambodia — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/kh
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 465                                                              |
| With vector artwork | 465                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Vienna Convention (Prakas on Road Signs 2014)                    |
| Regulator           | MPWT                                                             |
| Drive side          | right-hand                                                       |
| Language(s)         | Khmer                                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kh';

signs; // the whole registry
getSign('other-danger'); // by slug id
getSignByCode('other-danger'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('other-danger')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/kh/dist/sprite.css" />
<span class="rs-kh-other-danger" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/kh/dist/sprite.svg#rs-kh-other-danger" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Cambodia](https://en.wikipedia.org/wiki/Road_signs_in_Cambodia)
- [Wikimedia Commons — SVG road signs in Cambodia](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cambodia)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kh)

## License

MIT © Karl Norling
