import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
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

const render = (el: React.ReactElement): HTMLElement => {
  const host = document.createElement('div');
  document.body.appendChild(host);
  act(() => {
    createRoot(host).render(el);
  });
  return host;
};

describe('RoadSign', () => {
  it('inlines the SVG with an accessible name and description', () => {
    const host = render(<RoadSign sign={vector} />);
    const svg = host.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.getAttribute('aria-labelledby')).toBe('rs-title-w1-1-turn rs-desc-w1-1-turn');
    expect(host.querySelector('title')?.textContent).toBe('Turn');
    expect(host.querySelector('desc')?.textContent).toBe('Turn ahead');
  });

  it('applies size, and lets width/height override it', () => {
    const host = render(<RoadSign sign={vector} size={32} height={48} />);
    const svg = host.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('lets title and description be overridden', () => {
    const host = render(<RoadSign sign={vector} title="Custom" description="Desc" />);
    expect(host.querySelector('title')?.textContent).toBe('Custom');
    expect(host.querySelector('desc')?.textContent).toBe('Desc');
  });

  it('falls back to an img for raster-only signs', () => {
    const host = render(<RoadSign sign={raster} />);
    const img = host.querySelector('img');
    expect(img?.getAttribute('src')).toBe('data:image/png;base64,AAAA');
    expect(img?.getAttribute('alt')).toBe('Raster');
  });

  it('renders nothing when a sign has no artwork', () => {
    const host = render(<RoadSign sign={{ ...vector, svg: undefined }} />);
    expect(host.innerHTML).toBe('');
  });
});
