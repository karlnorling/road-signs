import type { TLCategory, TLSign } from './types';
import { signs } from './signs.generated';

export type { TLCategory, TLSign } from './types';
export { signs };

export const getAllSigns = (): TLSign[] => [...signs];

export const getSign = (id: string): TLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TLCategory): TLSign[] =>
  signs.filter((s) => s.category === category);
