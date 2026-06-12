import type { MZCategory, MZSign } from './types';
import { signs } from './signs.generated';

export type { MZCategory, MZSign } from './types';
export { signs };

export const getAllSigns = (): MZSign[] => [...signs];

export const getSign = (id: string): MZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MZCategory): MZSign[] =>
  signs.filter((s) => s.category === category);
