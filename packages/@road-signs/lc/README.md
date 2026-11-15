# @road-signs/lc

Road signs for Saint Lucia — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/lc/).

## Install

```sh
npm install @road-signs/lc
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/lc';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — Road signs in Saint Lucia](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Lucia)

## Notes

No SVG assets currently on Wikimedia Commons. Saint Lucia uses a British-derived sign system under the Road Traffic Act.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/lc)

## License

MIT © Karl Norling
