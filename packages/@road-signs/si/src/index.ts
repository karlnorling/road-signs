import type { SICategory, SISign } from './types.js';
import { signs } from './signs.generated.js';

export type { SICategory, SISign } from './types.js';
export { signs };

export const getAllSigns = (): SISign[] => [...signs];

export const getSign = (id: string): SISign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SISign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SICategory): SISign[] =>
  signs.filter((s) => s.category === category);
