import type { MTCategory, MTSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MTCategory, MTSign } from './types.js';
export { signs };

export const getAllSigns = (): MTSign[] => [...signs];

export const getSign = (id: string): MTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MTCategory): MTSign[] =>
  signs.filter((s) => s.category === category);
