import type { GQCategory, GQSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GQCategory, GQSign } from './types.js';
export { signs };

export const getAllSigns = (): GQSign[] => [...signs];

export const getSign = (id: string): GQSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GQSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GQCategory): GQSign[] =>
  signs.filter((s) => s.category === category);
