# @road-signs/gd

Road signs for Grenada — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/gd/).

## Install

```sh
npm install @road-signs/gd
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/gd';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — Road signs in Grenada](https://commons.wikimedia.org/wiki/Category:Road_signs_in_Grenada)

## Notes

No SVG assets currently on Wikimedia Commons. Grenada uses a British-derived sign system under the Road Traffic Act.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/gd)

## License

MIT © Karl Norling
