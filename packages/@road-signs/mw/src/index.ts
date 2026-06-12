import type { MWCategory, MWSign } from './types';
import { signs } from './signs.generated';

export type { MWCategory, MWSign } from './types';
export { signs };

export const getAllSigns = (): MWSign[] => [...signs];

export const getSign = (id: string): MWSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MWSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MWCategory): MWSign[] =>
  signs.filter((s) => s.category === category);
