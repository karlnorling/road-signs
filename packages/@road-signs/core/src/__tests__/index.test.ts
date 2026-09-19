import { getAllSigns, getSign, getSignByCode, getSignsByCategory } from '../index';
import type { Sign } from '../types';

const signs: Sign[] = [
  {
    category: 'warning',
    code: 'W1-1',
    description: 'Turn',
    id: 'w1-1-turn',
    name: 'Turn',
    svg: '<svg/>',
  },
  {
    category: 'warning',
    code: 'W1-2',
    description: 'Curve',
    id: 'w1-2-curve',
    name: 'Curve',
    svg: '<svg/>',
  },
  {
    category: 'regulatory',
    code: 'R1-1',
    description: 'Stop',
    id: 'r1-1-stop',
    name: 'Stop',
    svg: '<svg/>',
  },
];

describe('lookup helpers', () => {
  it('getAllSigns returns a copy, not the registry itself', () => {
    const all = getAllSigns(signs);
    expect(all).toEqual(signs);
    expect(all).not.toBe(signs);
    all.pop();
    expect(signs).toHaveLength(3);
  });

  it('getSign finds by slug id', () => {
    expect(getSign(signs, 'r1-1-stop')?.code).toBe('R1-1');
    expect(getSign(signs, 'nope')).toBeUndefined();
  });

  it('getSignByCode finds by official code', () => {
    expect(getSignByCode(signs, 'W1-2')?.id).toBe('w1-2-curve');
    expect(getSignByCode(signs, 'w1-2')).toBeUndefined();
  });

  it('getSignsByCategory filters', () => {
    expect(getSignsByCategory(signs, 'warning').map((s) => s.id)).toEqual([
      'w1-1-turn',
      'w1-2-curve',
    ]);
    expect(getSignsByCategory(signs, 'missing')).toEqual([]);
  });
});
