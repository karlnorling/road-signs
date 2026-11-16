import type { TZCategory, TZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TZCategory, TZSign } from './types.js';
export { signs };

export const getAllSigns = (): TZSign[] => [...signs];

export const getSign = (id: string): TZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TZCategory): TZSign[] =>
  signs.filter((s) => s.category === category);
