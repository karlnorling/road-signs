import type { MRCategory, MRSign } from './types';
import { signs } from './signs.generated';

export type { MRCategory, MRSign } from './types';
export { signs };

export const getAllSigns = (): MRSign[] => [...signs];

export const getSign = (id: string): MRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MRCategory): MRSign[] =>
  signs.filter((s) => s.category === category);
