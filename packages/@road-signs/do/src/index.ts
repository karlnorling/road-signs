import type { DOCategory, DOSign } from './types';
import { signs } from './signs.generated';

export type { DOCategory, DOSign } from './types';
export { signs };

export const getAllSigns = (): DOSign[] => [...signs];

export const getSign = (id: string): DOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DOCategory): DOSign[] =>
  signs.filter((s) => s.category === category);
