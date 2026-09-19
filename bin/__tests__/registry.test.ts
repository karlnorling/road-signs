import { parseRegistrySource } from '../lib/registry';

const literal = (fields: string[]): string => ['  {', ...fields, '  },'].join('\n');

describe('parseRegistrySource', () => {
  it('reads every field of a vector sign', () => {
    const src = literal([
      '    assets: {',
      '      png: {"240":"assets/warning/w1-1/x_240x240.png"},',
      '    },',
      '    category: "warning",',
      '    code: "W1-1",',
      '    description: "Turn",',
      '    id: "w1-1-turn",',
      '    name: "Turn",',
      '    svg: "<svg viewBox=\\"0 0 1 1\\"/>",',
    ]);
    expect(parseRegistrySource('us', src)).toEqual([
      {
        cc: 'us',
        category: 'warning',
        code: 'W1-1',
        description: 'Turn',
        id: 'w1-1-turn',
        name: 'Turn',
        png: undefined,
        svg: '<svg viewBox="0 0 1 1"/>',
      },
    ]);
  });

  it('reads a raster-only sign', () => {
    const src = literal([
      '    category: "information",',
      '    code: "RG-14",',
      '    description: "Sign",',
      '    id: "rg-14-sign",',
      '    name: "Sign",',
      '    png: "data:image/png;base64,AAAA",',
    ]);
    const [sign] = parseRegistrySource('fj', src);
    expect(sign.png).toBe('data:image/png;base64,AAAA');
    expect(sign.svg).toBeUndefined();
  });

  it('is not confused by field-like text inside an inline SVG', () => {
    // A regex over the whole block would match this `code:` and `id:`.
    const src = literal([
      '    category: "warning",',
      '    code: "A1",',
      '    description: "D",',
      '    id: "a1-d",',
      '    name: "N",',
      '    svg: "<svg><style>.x{content:\\"code: WRONG\\"}</style><g id=\\"a1-d-inner\\"/></svg>",',
    ]);
    const [sign] = parseRegistrySource('de', src);
    expect(sign.code).toBe('A1');
    expect(sign.id).toBe('a1-d');
  });

  it('parses several literals and ignores surrounding module code', () => {
    const src = [
      "import type { USSign } from './types';",
      'export const signs: USSign[] = [',
      literal([
        '    category: "a",',
        '    code: "1",',
        '    description: "x",',
        '    id: "i1",',
        '    name: "x",',
        '    svg: "<svg/>",',
      ]),
      literal([
        '    category: "b",',
        '    code: "2",',
        '    description: "y",',
        '    id: "i2",',
        '    name: "y",',
        '    svg: "<svg/>",',
      ]),
      '];',
    ].join('\n');
    expect(parseRegistrySource('us', src).map((s) => s.id)).toEqual(['i1', 'i2']);
  });
});
