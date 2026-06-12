import type { SICategory, SISign } from './types';
import { signs } from './signs.generated';

export type { SICategory, SISign } from './types';
export { signs };

export const getAllSigns = (): SISign[] => [...signs];

export const getSign = (id: string): SISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SICategory): SISign[] =>
  signs.filter((s) => s.category === category);
