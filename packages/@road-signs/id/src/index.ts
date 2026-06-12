import type { IDCategory, IDSign } from './types';
import { signs } from './signs.generated';

export type { IDCategory, IDSign } from './types';
export { signs };

export const getAllSigns = (): IDSign[] => [...signs];

export const getSign = (id: string): IDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): IDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: IDCategory): IDSign[] =>
  signs.filter((s) => s.category === category);
