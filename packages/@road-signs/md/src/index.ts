import type { MDCategory, MDSign } from './types';
import { signs } from './signs.generated';

export type { MDCategory, MDSign } from './types';
export { signs };

export const getAllSigns = (): MDSign[] => [...signs];

export const getSign = (id: string): MDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MDCategory): MDSign[] =>
  signs.filter((s) => s.category === category);
