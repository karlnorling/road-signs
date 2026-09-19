# @road-signs/vc

Road signs for Saint Vincent and the Grenadines — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/vc/).

## Install

```sh
npm install @road-signs/vc
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/vc';

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

- [Wikimedia Commons — Road signs in Saint Vincent and the Grenadines](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Vincent_and_the_Grenadines)

## Notes

No SVG assets currently on Wikimedia Commons. Saint Vincent and the Grenadines uses a British-derived sign system under the Road Traffic Act.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/vc)

## License

MIT © Karl Norling
