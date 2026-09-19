# @road-signs/ht

Road signs for Haiti — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/ht/).

## Install

```sh
npm install @road-signs/ht
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ht';

signs; // the whole registry
```

Each sign carries its own artwork, so nothing else has to be copied or served:

```ts
const sign = getSign('some-sign-id')!;

sign.svg; // inline SVG markup (most signs)
sign.png; // base64 PNG data URI (signs with no vector source)
```

> `sign.assets` holds paths into this repo's build-time `assets/` tree.
> That directory is ~16GB across all countries and is **not published** —
> use `sign.svg` or `sign.png` to render.

## Sources

- [Wikimedia Commons — SVG road signs in Haiti](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Haiti)
- [Ministère des Travaux Publics, Transports et Communications (MTPTC)](https://mtptc.gouv.ht/)

## Notes

No SVG assets currently on Wikimedia Commons. Haiti uses a French-influenced sign system based on the Vienna Convention. The governing authority is the Ministère des Travaux Publics, Transports et Communications (MTPTC). No publicly available official sign manual PDF has been located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ht)

## License

MIT © Karl Norling
