# @road-signs/elements

Framework-free custom element for road signs — works with any country package.

## Install

```sh
npm install @road-signs/elements
```

## Usage

```ts
import { RoadSignElement } from '@road-signs/elements';
import { getSign } from '@road-signs/us';

customElements.define('road-sign', RoadSignElement);

const el = document.createElement('road-sign') as RoadSignElement;
el.sign = getSign('w1-1r-turn-right')!; // set the sign, not an attribute
el.setAttribute('size', '64');
document.body.append(el);
```

Every sign renders from its country package alone — the artwork is inline
SVG, with the accessible name and description injected into it automatically.

## Links

- [Documentation](https://karlnorling.github.io/road-signs)
- [Source](https://github.com/karlnorling/road-signs/tree/main/packages/@road-signs/elements)

## License

MIT © Karl Norling
