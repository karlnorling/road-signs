import type { AUCategory, AUSign } from './types';
import { signs } from './signs.generated';

export type { AUCategory, AUSign } from './types';
export { signs };

export const getAllSigns = (): AUSign[] => [...signs];

export const getSign = (id: string): AUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AUCategory): AUSign[] =>
  signs.filter((s) => s.category === category);
