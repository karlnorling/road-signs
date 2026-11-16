import type { FJCategory, FJSign } from './types.js';
import { signs } from './signs.generated.js';

export type { FJCategory, FJSign } from './types.js';
export { signs };

export const getAllSigns = (): FJSign[] => [...signs];

export const getSign = (id: string): FJSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): FJSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: FJCategory): FJSign[] =>
  signs.filter((s) => s.category === category);
