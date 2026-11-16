import type { CZCategory, CZSign } from './types.js';
import { signs } from './signs.generated.js';

export type { CZCategory, CZSign } from './types.js';
export { signs };

export const getAllSigns = (): CZSign[] => [...signs];

export const getSign = (id: string): CZSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CZSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CZCategory): CZSign[] =>
  signs.filter((s) => s.category === category);
