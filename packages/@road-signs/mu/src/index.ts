import type { MUCategory, MUSign } from './types';
import { signs } from './signs.generated';

export type { MUCategory, MUSign } from './types';
export { signs };

export const getAllSigns = (): MUSign[] => [...signs];

export const getSign = (id: string): MUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MUCategory): MUSign[] =>
  signs.filter((s) => s.category === category);
