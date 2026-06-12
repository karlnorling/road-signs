import type { ISCategory, ISSign } from './types';
import { signs } from './signs.generated';

export type { ISCategory, ISSign } from './types';
export { signs };

export const getAllSigns = (): ISSign[] => [...signs];

export const getSign = (id: string): ISSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ISSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ISCategory): ISSign[] =>
  signs.filter((s) => s.category === category);
