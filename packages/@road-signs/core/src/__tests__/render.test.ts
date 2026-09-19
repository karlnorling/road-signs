import { decorateSvg, escapeHtml, signArtwork } from '../render';
import type { Sign } from '../types';

const base: Sign = {
  category: 'warning',
  code: 'W1-1',
  description: 'Turn ahead',
  id: 'w1-1-turn',
  name: 'Turn',
};

const opts = {
  description: 'Turn ahead',
  descId: 'rs-desc-w1-1-turn',
  height: 64,
  title: 'Turn',
  titleId: 'rs-title-w1-1-turn',
  width: 64,
};

describe('escapeHtml', () => {
  it('escapes the five markup-significant characters', () => {
    expect(escapeHtml(`<a href="x" title='y'>&</a>`)).toBe(
      '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;',
    );
  });
});

describe('decorateSvg', () => {
  it('adds role, label wiring and size to the root element', () => {
    const out = decorateSvg('<svg viewBox="0 0 1 1"><rect/></svg>', opts);
    expect(out).toContain('role="img"');
    expect(out).toContain('aria-labelledby="rs-title-w1-1-turn rs-desc-w1-1-turn"');
    expect(out).toContain('width="64"');
    expect(out).toContain('height="64"');
  });

  it('inserts title and desc immediately after the root tag', () => {
    const out = decorateSvg('<svg viewBox="0 0 1 1"><rect/></svg>', opts);
    expect(out).toMatch(/^<svg[^>]*><title id="rs-title-w1-1-turn">Turn<\/title>/);
    expect(out).toContain('<desc id="rs-desc-w1-1-turn">Turn ahead</desc>');
    expect(out.endsWith('<rect/></svg>')).toBe(true);
  });

  it('drops anything before the root element', () => {
    // Raw Inkscape artwork (SVGO failed) leads with a comment. Injecting after
    // the first `>` in the string used to bury the <title> inside it.
    const out = decorateSvg('<!-- Created with Inkscape --><svg viewBox="0 0 1 1"/>', opts);
    expect(out.startsWith('<svg')).toBe(true);
    expect(out).not.toContain('Inkscape');
    expect(out).toContain('<title id="rs-title-w1-1-turn">Turn</title>');
  });

  it('handles a root tag whose attribute value contains a >', () => {
    const out = decorateSvg('<svg viewBox="0 0 1 1" data-x="a>b"><rect/></svg>', opts);
    expect(out).toContain('data-x="a>b"');
    expect(out).toMatch(/<rect\/><\/svg>$/);
    expect(out.indexOf('<title')).toBeLessThan(out.indexOf('<rect'));
  });

  it('expands a self-closing root element', () => {
    const out = decorateSvg('<svg viewBox="0 0 1 1"/>', opts);
    expect(out).toContain('<desc id="rs-desc-w1-1-turn">Turn ahead</desc></svg>');
    expect(out).not.toContain('/>');
  });

  it('escapes the injected title and description', () => {
    const out = decorateSvg('<svg/>', { ...opts, title: '<b>&', description: '"x"' });
    expect(out).toContain('<title id="rs-title-w1-1-turn">&lt;b&gt;&amp;</title>');
    expect(out).toContain('<desc id="rs-desc-w1-1-turn">&quot;x&quot;</desc>');
  });

  it('returns the input unchanged when there is no root element', () => {
    expect(decorateSvg('not markup', opts)).toBe('not markup');
  });
});

describe('signArtwork', () => {
  it('prefers inline svg', () => {
    expect(signArtwork({ ...base, svg: '<svg/>', png: 'data:image/png;base64,A' })).toEqual({
      kind: 'svg',
      svg: '<svg/>',
    });
  });

  it('falls back to the png data URI', () => {
    expect(signArtwork({ ...base, png: 'data:image/png;base64,A' })).toEqual({
      kind: 'png',
      src: 'data:image/png;base64,A',
    });
  });

  it('ignores assets paths, which are not published', () => {
    const sign: Sign = {
      ...base,
      assets: { jpg: {}, png: { 240: 'assets/warning/w1-1/x_240x240.png' }, webp: {} },
    };
    expect(signArtwork(sign)).toBeNull();
  });
});
