import type { RUCategory, RUSign } from './types.js';
import { signs } from './signs.generated.js';

export type { RUCategory, RUSign } from './types.js';
export { signs };

export const getAllSigns = (): RUSign[] => [...signs];

export const getSign = (id: string): RUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): RUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: RUCategory): RUSign[] =>
  signs.filter((s) => s.category === category);
