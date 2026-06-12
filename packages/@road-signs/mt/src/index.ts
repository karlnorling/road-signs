import type { MTCategory, MTSign } from './types';
import { signs } from './signs.generated';

export type { MTCategory, MTSign } from './types';
export { signs };

export const getAllSigns = (): MTSign[] => [...signs];

export const getSign = (id: string): MTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MTCategory): MTSign[] =>
  signs.filter((s) => s.category === category);
