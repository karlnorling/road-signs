import type { ISCategory, ISSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ISCategory, ISSign } from './types.js';
export { signs };

export const getAllSigns = (): ISSign[] => [...signs];

export const getSign = (id: string): ISSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ISSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ISCategory): ISSign[] =>
  signs.filter((s) => s.category === category);
