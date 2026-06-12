import type { FICategory, FISign } from './types';
import { signs } from './signs.generated';

export type { FICategory, FISign } from './types';
export { signs };

export const getAllSigns = (): FISign[] => [...signs];

export const getSign = (id: string): FISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): FISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: FICategory): FISign[] =>
  signs.filter((s) => s.category === category);
