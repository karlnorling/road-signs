import type { TTCategory, TTSign } from './types';
import { signs } from './signs.generated';

export type { TTCategory, TTSign } from './types';
export { signs };

export const getAllSigns = (): TTSign[] => [...signs];

export const getSign = (id: string): TTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TTCategory): TTSign[] =>
  signs.filter((s) => s.category === category);
