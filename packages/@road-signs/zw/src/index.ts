import type { ZWCategory, ZWSign } from './types';
import { signs } from './signs.generated';

export type { ZWCategory, ZWSign } from './types';
export { signs };

export const getAllSigns = (): ZWSign[] => [...signs];

export const getSign = (id: string): ZWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ZWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ZWCategory): ZWSign[] =>
  signs.filter((s) => s.category === category);
