# @road-signs/kp

Road signs for North Korea — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/kp
```

## At a glance

|                     |                                   |
| ------------------- | --------------------------------- |
| Signs               | 29                                |
| With vector artwork | 29                                |
| Categories          | `information`, `mandatory`        |
| Standard            | DPRK road sign system (도로 표시) |
| Regulator           | DPRK Ministry of Public Security  |
| Drive side          | right-hand                        |
| Language(s)         | Korean                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/kp';

signs; // the whole registry
getSign('horn-signal'); // by slug id
getSignByCode('horn-signal'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('horn-signal')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/kp/dist/sprite.css" />
<span class="rs-kp-horn-signal" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/kp/dist/sprite.svg#rs-kp-horn-signal" />
</svg>
```

## Sources

- [Wikimedia Commons — SVG road signs in North Korea](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Korea)

## Notes

North Korean road signs use Korean-language names with no alphanumeric codes. The 29 SVG diagrams on Wikimedia Commons are mapped to descriptive English slugs.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/kp)

## License

MIT © Karl Norling
