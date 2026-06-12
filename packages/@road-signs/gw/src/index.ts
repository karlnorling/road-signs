import type { GWCategory, GWSign } from './types';
import { signs } from './signs.generated';

export type { GWCategory, GWSign } from './types';
export { signs };

export const getAllSigns = (): GWSign[] => [...signs];

export const getSign = (id: string): GWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GWCategory): GWSign[] =>
  signs.filter((s) => s.category === category);
