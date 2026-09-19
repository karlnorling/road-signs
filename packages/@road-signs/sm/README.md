# @road-signs/sm

Road signs for San Marino — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> San Marino uses the Italy sign system, so this
> package re-exports [`@road-signs/it`](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/it)
> rather than duplicating its catalogue.

## Install

```sh
npm install @road-signs/sm
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sm';

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

- [Wikimedia Commons — SVG road signs in San Marino](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_San_Marino)
- [Wikimedia Commons — Diagrams of road signs of San Marino](https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_San_Marino)
- [Segreteria di Stato per il Territorio e l'Ambiente (road authority)](https://www.gov.sm/pub/Siti/SSTA/home.html)

## Notes

San Marino uses the Italian sign system (Codice della strada) without country-specific variants. SVG assets on Wikimedia Commons are very limited. Italian sign packages (IT) provide comprehensive coverage of the shared sign set.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sm)

## License

MIT © Karl Norling
