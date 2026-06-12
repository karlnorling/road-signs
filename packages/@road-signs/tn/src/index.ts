import type { TNCategory, TNSign } from './types';
import { signs } from './signs.generated';

export type { TNCategory, TNSign } from './types';
export { signs };

export const getAllSigns = (): TNSign[] => [...signs];

export const getSign = (id: string): TNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TNCategory): TNSign[] =>
  signs.filter((s) => s.category === category);
