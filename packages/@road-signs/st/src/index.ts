import type { STCategory, STSign } from './types';
import { signs } from './signs.generated';

export type { STCategory, STSign } from './types';
export { signs };

export const getAllSigns = (): STSign[] => [...signs];

export const getSign = (id: string): STSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): STSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: STCategory): STSign[] =>
  signs.filter((s) => s.category === category);
