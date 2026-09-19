# @road-signs/mu

Road signs for Mauritius — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/mu
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 104                                                              |
| With vector artwork | 104                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Traffic Signs Regulations 1990 — UK-derived system               |
| Regulator           | Traffic Management Road Safety Unit                              |
| Drive side          | left-hand                                                        |
| Language(s)         | English, French                                                  |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/mu';

signs; // the whole registry
getSign('curve-to-the-right'); // by slug id
getSignByCode('curve-to-the-right'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('curve-to-the-right')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/mu/dist/sprite.css" />
<span class="rs-mu-curve-to-the-right" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/mu/dist/sprite.svg#rs-mu-curve-to-the-right" />
</svg>
```

## Sources

- [Wikipedia — Road signs in Mauritius](https://en.wikipedia.org/wiki/Road_signs_in_Mauritius)
- [Wikimedia Commons — SVG road signs in Mauritius](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mauritius)

## Notes

Mauritius uses a UK-derived system (Traffic Signs Regulations 1990) rather than the SADC regional standard used by most neighbouring countries.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/mu)

## License

MIT © Karl Norling
