import type { TOCategory, TOSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TOCategory, TOSign } from './types.js';
export { signs };

export const getAllSigns = (): TOSign[] => [...signs];

export const getSign = (id: string): TOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TOCategory): TOSign[] =>
  signs.filter((s) => s.category === category);
