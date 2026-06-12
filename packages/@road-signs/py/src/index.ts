import type { PYCategory, PYSign } from './types';
import { signs } from './signs.generated';

export type { PYCategory, PYSign } from './types';
export { signs };

export const getAllSigns = (): PYSign[] => [...signs];

export const getSign = (id: string): PYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PYCategory): PYSign[] =>
  signs.filter((s) => s.category === category);
