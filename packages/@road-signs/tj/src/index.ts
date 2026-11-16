import type { TJCategory, TJSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TJCategory, TJSign } from './types.js';
export { signs };

export const getAllSigns = (): TJSign[] => [...signs];

export const getSign = (id: string): TJSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TJSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TJCategory): TJSign[] =>
  signs.filter((s) => s.category === category);
