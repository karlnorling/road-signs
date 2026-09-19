import { mount } from '@vue/test-utils';
import { RoadSign } from '../RoadSign';
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

describe('RoadSign', () => {
  it('inlines the SVG with an accessible name and description', () => {
    const wrapper = mount(RoadSign, { props: { sign: vector } });
    const svg = wrapper.element.querySelector('svg');
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.getAttribute('aria-labelledby')).toBe('rs-title-w1-1-turn rs-desc-w1-1-turn');
    expect(wrapper.element.querySelector('title')?.textContent).toBe('Turn');
    expect(wrapper.element.querySelector('desc')?.textContent).toBe('Turn ahead');
  });

  it('applies size, and lets width/height override it', () => {
    const wrapper = mount(RoadSign, { props: { sign: vector, size: 32, height: 48 } });
    const svg = wrapper.element.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('falls back to an img for raster-only signs', () => {
    const wrapper = mount(RoadSign, { props: { sign: raster } });
    expect(wrapper.element.tagName).toBe('IMG');
    expect(wrapper.attributes('src')).toBe('data:image/png;base64,AAAA');
    expect(wrapper.attributes('alt')).toBe('Raster');
  });

  it('renders nothing when a sign has no artwork', () => {
    const wrapper = mount(RoadSign, { props: { sign: { ...vector, svg: undefined } } });
    expect(wrapper.html()).toBe('');
  });
});
