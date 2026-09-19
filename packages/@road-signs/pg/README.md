# @road-signs/pg

Road signs for Papua New Guinea — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/pg/).

## Install

```sh
npm install @road-signs/pg
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/pg';

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

- [Wikimedia Commons — SVG road signs in Papua New Guinea](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Papua_New_Guinea)
- [Road Traffic Authority Papua New Guinea](https://www.rta.gov.pg/)
- [Road User Rules 2017 (PDF)](https://rta.gov.pg/pdfs/licences&approvals/RTR_RoadUserRules2017.pdf)

## Notes

No SVG assets currently on Wikimedia Commons. Papua New Guinea uses a British-derived sign system governed by the Road Traffic Authority (RTA) under the Road User Rules 2017.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/pg)

## License

MIT © Karl Norling
