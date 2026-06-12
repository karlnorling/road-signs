import type { CUCategory, CUSign } from './types';
import { signs } from './signs.generated';

export type { CUCategory, CUSign } from './types';
export { signs };

export const getAllSigns = (): CUSign[] => [...signs];

export const getSign = (id: string): CUSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CUSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CUCategory): CUSign[] =>
  signs.filter((s) => s.category === category);
