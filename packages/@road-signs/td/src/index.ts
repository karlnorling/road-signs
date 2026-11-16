import type { TDCategory, TDSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TDCategory, TDSign } from './types.js';
export { signs };

export const getAllSigns = (): TDSign[] => [...signs];

export const getSign = (id: string): TDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TDCategory): TDSign[] =>
  signs.filter((s) => s.category === category);
