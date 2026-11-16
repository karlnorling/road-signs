import type { SYCategory, SYSign } from './types.js';
import { signs } from './signs.generated.js';

export type { SYCategory, SYSign } from './types.js';
export { signs };

export const getAllSigns = (): SYSign[] => [...signs];

export const getSign = (id: string): SYSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SYSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SYCategory): SYSign[] =>
  signs.filter((s) => s.category === category);
