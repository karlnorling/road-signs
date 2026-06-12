import type { EGCategory, EGSign } from './types';
import { signs } from './signs.generated';

export type { EGCategory, EGSign } from './types';
export { signs };

export const getAllSigns = (): EGSign[] => [...signs];

export const getSign = (id: string): EGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): EGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: EGCategory): EGSign[] =>
  signs.filter((s) => s.category === category);
