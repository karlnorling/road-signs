import type { BOCategory, BOSign } from './types';
import { signs } from './signs.generated';

export type { BOCategory, BOSign } from './types';
export { signs };

export const getAllSigns = (): BOSign[] => [...signs];

export const getSign = (id: string): BOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BOCategory): BOSign[] =>
  signs.filter((s) => s.category === category);
