import type { TTCategory, TTSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TTCategory, TTSign } from './types.js';
export { signs };

export const getAllSigns = (): TTSign[] => [...signs];

export const getSign = (id: string): TTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TTCategory): TTSign[] =>
  signs.filter((s) => s.category === category);
