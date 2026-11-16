import type { BRCategory, BRSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BRCategory, BRSign } from './types.js';
export { signs };

export const getAllSigns = (): BRSign[] => [...signs];

export const getSign = (id: string): BRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BRCategory): BRSign[] =>
  signs.filter((s) => s.category === category);
