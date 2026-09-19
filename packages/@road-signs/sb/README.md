# @road-signs/sb

Road signs for Solomon Islands — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/sb/).

## Install

```sh
npm install @road-signs/sb
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/sb';

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

- [Inland Revenue Division — Solomon Islands](https://www.ird.gov.sb/)
- [Wikipedia — Transport in the Solomon Islands](https://en.wikipedia.org/wiki/Transport_in_the_Solomon_Islands)

## Notes

Empty package. Investigated 2026-06-13: the IRD "Guide to Obtaining a Driver’s Licence" PDF is a one-page procedural document with no sign diagrams. No Wikimedia Commons category for Solomon Islands road signs exists. Awaiting an on-the-ground catalogue or a recovered Road Transport Regulations 2014 gazette.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/sb)

## License

MIT © Karl Norling
