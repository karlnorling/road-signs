# @road-signs/ye

Road signs for Yemen — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/ye/).

## Install

```sh
npm install @road-signs/ye
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ye';

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

- [Wikimedia Commons — SVG road signs in Yemen](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Yemen)
- [Yemen Ministry of Transport (وزارة النقل)](https://www.mot.gov.ye/)

## Notes

No SVG assets currently on Wikimedia Commons. Yemen uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ye)

## License

MIT © Karl Norling
