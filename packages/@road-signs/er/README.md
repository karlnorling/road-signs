# @road-signs/er

Road signs for Eritrea — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/er/).

## Install

```sh
npm install @road-signs/er
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/er';

signs; // the whole registry
```

## Sources

- [Wikipedia — Transport in Eritrea](https://en.wikipedia.org/wiki/Transport_in_Eritrea)

## Notes

Minimal package: 6 SVGs sourced from Wikimedia Commons (1 stop sign + 5 PNH national-highway shields). Bhutan's full RSTA sign catalogue is not published online; this is a starter set.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/er)

## License

MIT © Karl Norling
