import type { KGCategory, KGSign } from './types';
import { signs } from './signs.generated';

export type { KGCategory, KGSign } from './types';
export { signs };

export const getAllSigns = (): KGSign[] => [...signs];

export const getSign = (id: string): KGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KGCategory): KGSign[] =>
  signs.filter((s) => s.category === category);
