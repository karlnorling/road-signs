import type { BICategory, BISign } from './types.js';
import { signs } from './signs.generated.js';

export type { BICategory, BISign } from './types.js';
export { signs };

export const getAllSigns = (): BISign[] => [...signs];

export const getSign = (id: string): BISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BICategory): BISign[] =>
  signs.filter((s) => s.category === category);
