import type { GDCategory, GDSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GDCategory, GDSign } from './types.js';
export { signs };

export const getAllSigns = (): GDSign[] => [...signs];

export const getSign = (id: string): GDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GDCategory): GDSign[] =>
  signs.filter((s) => s.category === category);
