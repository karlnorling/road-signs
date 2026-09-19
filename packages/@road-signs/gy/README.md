# @road-signs/gy

Road signs for Guyana — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/gy/).

## Install

```sh
npm install @road-signs/gy
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/gy';

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

- [Wikimedia Commons — SVG road signs in Guyana](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Guyana)
- [Ministry of Public Works — road infrastructure authority](https://mopw.gov.gy/)
- [Motor Vehicles and Road Traffic Act (PDF)](https://moha.gov.gy/wp-content/uploads/2021/04/Motor-Vehicle-and-Road-Act.pdf)

## Notes

No SVG assets currently on Wikimedia Commons. Guyana follows a British-derived sign system. Sign specifications are governed by the Motor Vehicles and Road Traffic Act, administered by the Ministry of Public Works.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/gy)

## License

MIT © Karl Norling
