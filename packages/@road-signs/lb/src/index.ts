import type { LBCategory, LBSign } from './types';
import { signs } from './signs.generated';

export type { LBCategory, LBSign } from './types';
export { signs };

export const getAllSigns = (): LBSign[] => [...signs];

export const getSign = (id: string): LBSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LBSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LBCategory): LBSign[] =>
  signs.filter((s) => s.category === category);
