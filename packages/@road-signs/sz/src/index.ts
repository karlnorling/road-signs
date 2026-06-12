import type { SZCategory, SZSign } from './types';
import { signs } from './signs.generated';

export type { SZCategory, SZSign } from './types';
export { signs };

export const getAllSigns = (): SZSign[] => [...signs];

export const getSign = (id: string): SZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SZCategory): SZSign[] =>
  signs.filter((s) => s.category === category);
