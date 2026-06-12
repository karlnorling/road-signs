import type { MYCategory, MYSign } from './types';
import { signs } from './signs.generated';

export type { MYCategory, MYSign } from './types';
export { signs };

export const getAllSigns = (): MYSign[] => [...signs];

export const getSign = (id: string): MYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MYCategory): MYSign[] =>
  signs.filter((s) => s.category === category);
