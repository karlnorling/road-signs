# @road-signs/core

Shared TypeScript types and generic lookup helpers for every `@road-signs/*` country package.

## Install

```sh
npm install @road-signs/core
```

## Usage

```ts
import { getSign, getSignsByCategory } from '@road-signs/core';
import type { Sign, ViennaSign } from '@road-signs/core';
import { signs } from '@road-signs/us';

// The helpers are generic over any country registry.
const sign = getSign(signs, 'w1-1r-turn-right');
const warnings = getSignsByCategory(signs, 'warning');
```

Every sign renders from its country package alone — the artwork is inline
SVG, with the accessible name and description injected into it automatically.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/core)

## License

MIT © Karl Norling
