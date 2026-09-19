import {
  cleanSvg,
  makeId,
  normalizeSvg,
  parsePx,
  scopeIds,
  slugify,
  uniqueId,
} from '../generate-source';

describe('makeId', () => {
  it('joins a distinct code and name', () => {
    expect(makeId('W1-1R', 'Turn (right)')).toBe('w1-1r-turn-right');
  });

  it('collapses a name that is identical to the code', () => {
    // Scrapers with no separate code field report the name as the code, which
    // used to produce `crossroads-crossroads`.
    expect(makeId('Crossroads', 'Crossroads')).toBe('crossroads');
  });

  it('collapses a name that already carries the code as a prefix', () => {
    expect(makeId('W1-10aR', 'W1-10aR Curve with crossroad (right)')).toBe(
      'w1-10ar-curve-with-crossroad-right',
    );
  });

  it('does not collapse a name that merely starts with similar characters', () => {
    // "w1" is not a segment-boundary prefix of "w10-…", so both parts are kept.
    expect(makeId('W1', 'W10 Something')).toBe('w1-w10-something');
  });

  it('falls back to whichever side is non-empty', () => {
    expect(makeId('', 'Stop')).toBe('stop');
    expect(makeId('R1-1', '')).toBe('r1-1');
  });
});

describe('uniqueId', () => {
  it('returns the id unchanged when it is free', () => {
    expect(uniqueId('stop', new Set())).toBe('stop');
  });

  it('suffixes collisions deterministically', () => {
    const used = new Set<string>();
    expect(uniqueId('stop', used)).toBe('stop');
    expect(uniqueId('stop', used)).toBe('stop-2');
    expect(uniqueId('stop', used)).toBe('stop-3');
  });
});

describe('slugify', () => {
  it('lowercases and collapses non-alphanumerics', () => {
    expect(slugify('Give Way — 100m!')).toBe('give-way-100m');
  });
});

describe('cleanSvg', () => {
  it('strips the XML declaration and DOCTYPE', () => {
    expect(cleanSvg('<?xml version="1.0"?><svg/>')).toBe('<svg/>');
  });

  it('strips a leading comment', () => {
    // SVGO-failed artwork falls back to the raw Inkscape file, which leads
    // with a comment. Leaving it in breaks the sprite builder and the
    // components' <title> injection.
    expect(cleanSvg('<!-- Created with Inkscape -->\n\n<svg viewBox="0 0 1 1"/>')).toBe(
      '<svg viewBox="0 0 1 1"/>',
    );
  });
});

describe('parsePx', () => {
  it('converts supported units to pixels', () => {
    expect(parsePx('10')).toBe(10);
    expect(parsePx('10px')).toBe(10);
    expect(parsePx('1in')).toBe(96);
    expect(parsePx('1pc')).toBe(16);
  });

  it('rejects unparseable or non-positive values', () => {
    expect(parsePx('0')).toBeNull();
    expect(parsePx('auto')).toBeNull();
    expect(parsePx('10em')).toBeNull();
  });
});

describe('normalizeSvg', () => {
  it('keeps an existing viewBox and drops root width/height', () => {
    const out = normalizeSvg('<svg width="10" height="20" viewBox="0 0 5 5"><rect/></svg>');
    expect(out).toContain('viewBox="0 0 5 5"');
    expect(out).not.toContain('width="10"');
    expect(out).not.toContain('height="20"');
  });

  it('synthesises a viewBox from width/height when absent', () => {
    expect(normalizeSvg('<svg width="1in" height="1in"><rect/></svg>')).toContain(
      'viewBox="0 0 96 96"',
    );
  });

  it('falls back to a neutral canvas when dimensions are unusable', () => {
    expect(normalizeSvg('<svg><rect/></svg>')).toContain('viewBox="0 0 100 100"');
  });
});

describe('scopeIds', () => {
  it('prefixes ids and the references that point at them', () => {
    const out = scopeIds('<defs><path id="a"/></defs><use href="#a" fill="url(#a)"/>', 'sign');
    expect(out).toContain('id="sign-a"');
    expect(out).toContain('href="#sign-a"');
    expect(out).toContain('url(#sign-a)');
  });

  it('leaves markup without ids untouched', () => {
    expect(scopeIds('<rect/>', 'sign')).toBe('<rect/>');
  });
});
