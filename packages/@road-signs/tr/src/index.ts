import type { TRCategory, TRSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TRCategory, TRSign } from './types.js';
export { signs };

export const getAllSigns = (): TRSign[] => [...signs];

export const getSign = (id: string): TRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TRCategory): TRSign[] =>
  signs.filter((s) => s.category === category);
