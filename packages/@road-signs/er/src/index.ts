import type { ERCategory, ERSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ERCategory, ERSign } from './types.js';
export { signs };

export const getAllSigns = (): ERSign[] => [...signs];

export const getSign = (id: string): ERSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ERSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ERCategory): ERSign[] =>
  signs.filter((s) => s.category === category);
