import type { CYCategory, CYSign } from './types';
import { signs } from './signs.generated';

export type { CYCategory, CYSign } from './types';
export { signs };

export const getAllSigns = (): CYSign[] => [...signs];

export const getSign = (id: string): CYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CYCategory): CYSign[] =>
  signs.filter((s) => s.category === category);
