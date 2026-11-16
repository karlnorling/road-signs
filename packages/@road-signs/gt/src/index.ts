import type { GTCategory, GTSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GTCategory, GTSign } from './types.js';
export { signs };

export const getAllSigns = (): GTSign[] => [...signs];

export const getSign = (id: string): GTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GTCategory): GTSign[] =>
  signs.filter((s) => s.category === category);
