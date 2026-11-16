import type { HNCategory, HNSign } from './types.js';
import { signs } from './signs.generated.js';

export type { HNCategory, HNSign } from './types.js';
export { signs };

export const getAllSigns = (): HNSign[] => [...signs];

export const getSign = (id: string): HNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): HNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: HNCategory): HNSign[] =>
  signs.filter((s) => s.category === category);
