# @road-signs/ci

Road signs for Côte d'Ivoire — a TypeScript registry with typed lookup helpers.

> **No signs yet.** This package is scaffolded but its registry is still empty,
> so `getAllSigns()` returns `[]`. Contributions of sources are welcome —
> see [the coverage notes](https://karlnorling.github.io/road-signs/countries/ci/).

## Install

```sh
npm install @road-signs/ci
```

## Usage

```ts
import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/ci';

signs; // the whole registry
```

## Sources

- [Wikimedia Commons — SVG road signs in Côte d'Ivoire](https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ivory_Coast)
- [AGEROUTE — Agence de Gestion des Routes (national road authority)](https://www.ageroute.ci/)

## Notes

No SVG assets currently on Wikimedia Commons. Côte d'Ivoire uses a French-influenced sign system. The national road authority is AGEROUTE (Agence de Gestion des Routes). Official sign specifications are not publicly available online.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/ci)

## License

MIT © Karl Norling
