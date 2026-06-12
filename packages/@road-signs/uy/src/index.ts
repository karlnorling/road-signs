import type { UYCategory, UYSign } from './types';
import { signs } from './signs.generated';

export type { UYCategory, UYSign } from './types';
export { signs };

export const getAllSigns = (): UYSign[] => [...signs];

export const getSign = (id: string): UYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): UYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: UYCategory): UYSign[] =>
  signs.filter((s) => s.category === category);
