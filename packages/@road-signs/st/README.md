# @road-signs/st

Road signs for São Tomé and Príncipe — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/st/).

## Install

```sh
npm install @road-signs/st
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/st';

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

- [Wikipedia — Transport in São Tomé and Príncipe](https://en.wikipedia.org/wiki/Transport_in_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe)

## Notes

Empty package: no publicly available SVG sign catalogue located.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/st)

## License

MIT © Karl Norling
