import type { BZCategory, BZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BZCategory, BZSign } from './types.js';
export { signs };

export const getAllSigns = (): BZSign[] => [...signs];

export const getSign = (id: string): BZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BZCategory): BZSign[] =>
  signs.filter((s) => s.category === category);
