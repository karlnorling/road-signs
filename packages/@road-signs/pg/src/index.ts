import type { PGCategory, PGSign } from './types.js';
import { signs } from './signs.generated.js';

export type { PGCategory, PGSign } from './types.js';
export { signs };

export const getAllSigns = (): PGSign[] => [...signs];

export const getSign = (id: string): PGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PGCategory): PGSign[] =>
  signs.filter((s) => s.category === category);
