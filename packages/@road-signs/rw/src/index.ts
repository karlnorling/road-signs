import type { RWCategory, RWSign } from './types';
import { signs } from './signs.generated';

export type { RWCategory, RWSign } from './types';
export { signs };

export const getAllSigns = (): RWSign[] => [...signs];

export const getSign = (id: string): RWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): RWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: RWCategory): RWSign[] =>
  signs.filter((s) => s.category === category);
