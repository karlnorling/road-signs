import type { CICategory, CISign } from './types.js';
import { signs } from './signs.generated.js';

export type { CICategory, CISign } from './types.js';
export { signs };

export const getAllSigns = (): CISign[] => [...signs];

export const getSign = (id: string): CISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CICategory): CISign[] =>
  signs.filter((s) => s.category === category);
