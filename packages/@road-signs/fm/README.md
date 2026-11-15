# @road-signs/fm

Road signs for Federated States of Micronesia — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/fm/).

## Install

```sh
npm install @road-signs/fm
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/fm';

signs; // the whole registry
```

## Sources

- [Wikipedia — Transport in the Federated States of Micronesia](https://en.wikipedia.org/wiki/Transport_in_the_Federated_States_of_Micronesia)

## Notes

Minimal package: 1 SVG from Commons (Give Way). Full GCC Traffic Signs Manual catalogue is not on Commons; this is a placeholder.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/fm)

## License

MIT © Karl Norling
