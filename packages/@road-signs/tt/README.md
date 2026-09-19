# @road-signs/tt

Road signs for Trinidad and Tobago — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/tt/).

## Install

```sh
npm install @road-signs/tt
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/tt';

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

- [Wikimedia Commons — SVG road signs in Trinidad and Tobago](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Trinidad_and_Tobago)
- [Ministry of Works and Transport — Highways Division signage](https://www.mowt.gov.tt/Divisions/Highways-Division/Services/Highways-Signage)
- [Trinidad and Tobago Highway Code (TTRegs)](https://www.ttregs.com/thc-the-highway-code.php)

## Notes

No SVG assets currently on Wikimedia Commons. Trinidad and Tobago uses a British-derived sign system under the Motor Vehicles and Road Traffic Act, administered by the Ministry of Works and Transport.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/tt)

## License

MIT © Karl Norling
