import { RoadSignElement, registerRoadSign } from '../RoadSignElement';
import type { Sign } from '@road-signs/core';

const vector: Sign = {
  category: 'warning',
  code: 'W1-1',
  description: 'Turn ahead',
  id: 'w1-1-turn',
  name: 'Turn',
  svg: '<svg viewBox="0 0 1 1"><rect/></svg>',
};

const raster: Sign = {
  category: 'information',
  code: 'RG-14',
  description: 'Raster sign',
  id: 'rg-14-raster',
  name: 'Raster',
  png: 'data:image/png;base64,AAAA',
};

const catalogue: Record<string, Sign> = {
  'w1-1-turn': vector,
  'rg-14-raster': raster,
};
const getSign = (id: string): Sign | undefined => catalogue[id];

customElements.define('road-sign-base', class extends RoadSignElement {});
registerRoadSign('road-sign-us', getSign);

const attach = (tag: string, attrs: Record<string, string> = {}): HTMLElement => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  return el;
};

afterEach(() => {
  document.body.innerHTML = '';
});

describe('RoadSignElement', () => {
  it('renders from the sign property', () => {
    const el = attach('road-sign-base') as RoadSignElement;
    el.sign = vector;
    expect(el.querySelector('svg')?.getAttribute('role')).toBe('img');
    expect(el.querySelector('title')?.textContent).toBe('Turn');
    expect(el.querySelector('desc')?.textContent).toBe('Turn ahead');
  });

  it('renders nothing without a sign', () => {
    expect(attach('road-sign-base').innerHTML).toBe('');
  });

  it('honours size, width and height attributes', () => {
    const el = attach('road-sign-base', { size: '32', height: '48' }) as RoadSignElement;
    el.sign = vector;
    const svg = el.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('falls back to an img for raster-only signs', () => {
    const el = attach('road-sign-base') as RoadSignElement;
    el.sign = raster;
    expect(el.querySelector('img')?.getAttribute('src')).toBe('data:image/png;base64,AAAA');
  });
});

describe('registerRoadSign', () => {
  it('resolves the sign-id attribute through the supplied lookup', () => {
    const el = attach('road-sign-us', { 'sign-id': 'w1-1-turn' });
    expect(el.querySelector('title')?.textContent).toBe('Turn');
  });

  it('re-renders when sign-id changes', () => {
    const el = attach('road-sign-us', { 'sign-id': 'w1-1-turn' });
    el.setAttribute('sign-id', 'rg-14-raster');
    expect(el.querySelector('img')?.getAttribute('src')).toBe('data:image/png;base64,AAAA');
  });

  it('renders nothing for an unknown sign-id', () => {
    expect(attach('road-sign-us', { 'sign-id': 'nope' }).innerHTML).toBe('');
  });

  it('exposes the resolved sign through the property getter', () => {
    const el = attach('road-sign-us', { 'sign-id': 'w1-1-turn' }) as RoadSignElement;
    expect(el.sign?.code).toBe('W1-1');
  });

  it('ignores a repeat registration of the same tag', () => {
    expect(() => registerRoadSign('road-sign-us', getSign)).not.toThrow();
  });
});
