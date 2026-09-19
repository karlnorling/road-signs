# @road-signs/be

Road signs for Belgium — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/be
```

## At a glance

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Signs               | 113                                                              |
| With vector artwork | 113                                                              |
| Categories          | `information`, `mandatory`, `priority`, `prohibitory`, `warning` |
| Standard            | Code de la route / Verkeersreglement — Vienna Convention         |
| Regulator           | SPF Mobilité                                                     |
| Drive side          | right-hand                                                       |
| Language(s)         | Dutch, French, German                                            |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/be';

signs; // the whole registry
getSign('a1a-bend-to-the-left'); // by slug id
getSignByCode('A1A'); // by official code
getSignsByCategory('information'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('a1a-bend-to-the-left')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/be/dist/sprite.css" />
<span class="rs-be-a1a-bend-to-the-left" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/be/dist/sprite.svg#rs-be-a1a-bend-to-the-left" />
</svg>
```

## Sources

- [Wikimedia Commons — Road signs in Belgium](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belgium)

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/be)

## License

MIT © Karl Norling
