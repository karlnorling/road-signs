# @road-signs/dm

Road signs for Dominica — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/dm/).

## Install

```sh
npm install @road-signs/dm
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/dm';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — Diagrams of road signs of Dominica](https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Dominica)

## Notes

Very limited SVG coverage on Wikimedia Commons (give way sign only). Dominica uses a British-derived sign system under the Road Traffic Act.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/dm)

## License

MIT © Karl Norling
