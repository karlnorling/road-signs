import type { FRCategory, FRSign } from './types';
import { signs } from './signs.generated';

export type { FRCategory, FRSign } from './types';
export { signs };

export const getAllSigns = (): FRSign[] => [...signs];

export const getSign = (id: string): FRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): FRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: FRCategory): FRSign[] =>
  signs.filter((s) => s.category === category);
