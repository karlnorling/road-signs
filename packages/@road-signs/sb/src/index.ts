import type { SBCategory, SBSign } from './types';
import { signs } from './signs.generated';

export type { SBCategory, SBSign } from './types';
export { signs };

export const getAllSigns = (): SBSign[] => [...signs];

export const getSign = (id: string): SBSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SBSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SBCategory): SBSign[] =>
  signs.filter((s) => s.category === category);
