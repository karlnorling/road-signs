# @road-signs/bs

Road signs for Bahamas — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/bs/).

## Install

```sh
npm install @road-signs/bs
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bs';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — Diagrams of road signs of the Bahamas](https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_the_Bahamas)

## Notes

Very limited SVG coverage on Wikimedia Commons. The Bahamas uses a British-derived sign system under the Road Traffic Act.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bs)

## License

MIT © Karl Norling
