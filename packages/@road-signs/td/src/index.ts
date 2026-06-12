import type { TDCategory, TDSign } from './types';
import { signs } from './signs.generated';

export type { TDCategory, TDSign } from './types';
export { signs };

export const getAllSigns = (): TDSign[] => [...signs];

export const getSign = (id: string): TDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TDCategory): TDSign[] =>
  signs.filter((s) => s.category === category);
