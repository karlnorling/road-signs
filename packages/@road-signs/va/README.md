# @road-signs/va

Road signs for Vatican City — a TypeScript registry with every sign's artwork inlined, plus an SVG symbol sheet and a CSS sprite.

> Vatican City uses the Italy sign system, so this
> package re-exports [`@road-signs/it`](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/it)
> rather than duplicating its catalogue.

## Install

```sh
npm install @road-signs/va
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/va';

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

- [Wikipedia — Road signs in Italy (Vatican uses the Italian system)](https://en.wikipedia.org/wiki/Road_signs_in_Italy)

## Notes

Vatican City is fully integrated into the Italian road-sign system. @road-signs/va re-exports @road-signs/it.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/va)

## License

MIT © Karl Norling
