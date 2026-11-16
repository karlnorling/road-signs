import type { GMCategory, GMSign } from './types.js';
import { signs } from './signs.generated.js';

export type { GMCategory, GMSign } from './types.js';
export { signs };

export const getAllSigns = (): GMSign[] => [...signs];

export const getSign = (id: string): GMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GMCategory): GMSign[] =>
  signs.filter((s) => s.category === category);
