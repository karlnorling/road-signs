# @road-signs/cm

Road signs for Cameroon — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/cm/).

## Install

```sh
npm install @road-signs/cm
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/cm';

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

- [Wikimedia Commons — SVG road signs in Cameroon](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cameroon)
- [Ministère des Transports du Cameroun (national transport authority)](https://www.mintransports.gov.cm/)
- [Road signs in Cameroon — sign guide (third-party)](https://temovision.com/highway-code-road-signs-meaning-in-cameroon/)

## Notes

No SVG assets currently on Wikimedia Commons. Cameroon uses the CEMAC (Communauté Économique et Monétaire de l'Afrique Centrale) highway code, a French-influenced regional standard. Official sign PDFs are not publicly available online.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/cm)

## License

MIT © Karl Norling
