import type { MMCategory, MMSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MMCategory, MMSign } from './types.js';
export { signs };

export const getAllSigns = (): MMSign[] => [...signs];

export const getSign = (id: string): MMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MMCategory): MMSign[] =>
  signs.filter((s) => s.category === category);
