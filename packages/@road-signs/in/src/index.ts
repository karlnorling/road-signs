import type { INCategory, INSign } from './types';
import { signs } from './signs.generated';

export type { INCategory, INSign } from './types';
export { signs };

export const getAllSigns = (): INSign[] => [...signs];

export const getSign = (id: string): INSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): INSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: INCategory): INSign[] =>
  signs.filter((s) => s.category === category);
