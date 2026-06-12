import type { FJCategory, FJSign } from './types';
import { signs } from './signs.generated';

export type { FJCategory, FJSign } from './types';
export { signs };

export const getAllSigns = (): FJSign[] => [...signs];

export const getSign = (id: string): FJSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): FJSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: FJCategory): FJSign[] =>
  signs.filter((s) => s.category === category);
