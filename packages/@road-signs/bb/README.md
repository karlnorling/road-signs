# @road-signs/bb

Road signs for Barbados — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/bb/).

## Install

```sh
npm install @road-signs/bb
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/bb';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Barbados](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Barbados)

## Notes

Very limited SVG coverage on Wikimedia Commons (give way and stop signs only). Barbados uses a British-derived sign system under the Road Traffic Act, administered by the Ministry of Transport and Works.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/bb)

## License

MIT © Karl Norling
