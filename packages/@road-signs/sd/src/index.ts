import type { SDCategory, SDSign } from './types';
import { signs } from './signs.generated';

export type { SDCategory, SDSign } from './types';
export { signs };

export const getAllSigns = (): SDSign[] => [...signs];

export const getSign = (id: string): SDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SDCategory): SDSign[] =>
  signs.filter((s) => s.category === category);
