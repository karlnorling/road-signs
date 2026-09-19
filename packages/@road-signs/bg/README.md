# @road-signs/bg

Road signs for Bulgaria — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/bg
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 188                                                              |
| With vector artwork | 188                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Закон за движението по пътищата (ZDP) — Vienna Convention        |
| Regulator           | API                                                              |
| Drive side          | right-hand                                                       |
| Language(s)         | Bulgarian                                                        |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bg';

signs; // the whole registry
getSign('1-right-curve'); // by slug id
getSignByCode('1-right-curve'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('1-right-curve')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/bg/dist/sprite.css" />
<span class="rs-bg-1-right-curve" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/bg/dist/sprite.svg#rs-bg-1-right-curve" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Bulgaria](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bulgaria)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bg)

## License

MIT © Karl Norling
