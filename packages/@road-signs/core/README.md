# @road-signs/core

Shared TypeScript types and generic lookup helpers for every `@road-signs/*` country package.

## Install

```sh
npm install @road-signs/core
```

## Usage

```ts
import { getSign, getSignsByCategory, decorateSvg } from '@road-signs/core';
import type { Sign, ViennaSign } from '@road-signs/core';

// The helpers are generic over any country registry.
const sign = getSign(registry, 'w1-1-turn');
```

Every sign renders from the package alone: vector signs carry inline SVG,
and the handful with no vector source carry a base64 PNG data URI.
Accessible name and description are injected into the SVG automatically.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/core)

## License

MIT © Karl Norling
