import type { GYCategory, GYSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GYCategory, GYSign } from './types.js';
export { signs };

export const getAllSigns = (): GYSign[] => [...signs];

export const getSign = (id: string): GYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GYCategory): GYSign[] =>
  signs.filter((s) => s.category === category);
