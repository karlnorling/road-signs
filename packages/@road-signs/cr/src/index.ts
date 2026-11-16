import type { CRCategory, CRSign } from './types.js';
import { signs } from './signs.generated.js';

export type { CRCategory, CRSign } from './types.js';
export { signs };

export const getAllSigns = (): CRSign[] => [...signs];

export const getSign = (id: string): CRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CRCategory): CRSign[] =>
  signs.filter((s) => s.category === category);
