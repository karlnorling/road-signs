import type { HRCategory, HRSign } from './types';
import { signs } from './signs.generated';

export type { HRCategory, HRSign } from './types';
export { signs };

export const getAllSigns = (): HRSign[] => [...signs];

export const getSign = (id: string): HRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): HRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: HRCategory): HRSign[] =>
  signs.filter((s) => s.category === category);
