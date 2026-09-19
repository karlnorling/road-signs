# @road-signs/to

Road signs for Tonga — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

## Install

```sh
npm install @road-signs/to
```

## At a glance

|                     |                               |
| ------------------- | ----------------------------- |
| Signs               | 2                             |
| With vector artwork | 2                             |
| Categories          | `priority`                    |
| Standard            | British-derived (Traffic Act) |

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/to';

signs; // the whole registry
getSign('stop'); // by slug id
getSignByCode('STOP'); // by official code
getSignsByCategory('priority'); // by category
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('stop')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sprites

`dist/sprite.css` — one class per sign, artwork embedded as a data URI:

```html
<link rel="stylesheet" href="node_modules/@road-signs/to/dist/sprite.css" />
<span class="rs-to-stop" style="display:inline-block;width:64px;height:64px"></span>
```

`dist/sprite.svg` — an SVG symbol sheet:

```html
<svg width="64" height="64">
  <use href="node_modules/@road-signs/to/dist/sprite.svg#rs-to-stop" />
</svg>
```

## Sources

- [Wikipedia — Transport in Tonga](https://en.wikipedia.org/wiki/Transport_in_Tonga)

## Notes

Minimal package: 2 SVGs from Commons (Stop, Give Way). Tonga's full catalogue is not online.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/to)

## License

MIT © Karl Norling
