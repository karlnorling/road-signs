import type { NZCategory, NZSign } from './types';
import { signs } from './signs.generated';

export type { NZCategory, NZSign } from './types';
export { signs };

export const getAllSigns = (): NZSign[] => [...signs];

export const getSign = (id: string): NZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NZCategory): NZSign[] =>
  signs.filter((s) => s.category === category);
