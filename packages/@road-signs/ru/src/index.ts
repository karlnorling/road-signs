import type { RUCategory, RUSign } from './types';
import { signs } from './signs.generated';

export type { RUCategory, RUSign } from './types';
export { signs };

export const getAllSigns = (): RUSign[] => [...signs];

export const getSign = (id: string): RUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): RUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: RUCategory): RUSign[] =>
  signs.filter((s) => s.category === category);
