import type { IDCategory, IDSign } from './types.js';
import { signs } from './signs.generated.js';

export type { IDCategory, IDSign } from './types.js';
export { signs };

export const getAllSigns = (): IDSign[] => [...signs];

export const getSign = (id: string): IDSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): IDSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: IDCategory): IDSign[] =>
  signs.filter((s) => s.category === category);
