import type { CFCategory, CFSign } from './types.js';
import { signs } from './signs.generated.js';

export type { CFCategory, CFSign } from './types.js';
export { signs };

export const getAllSigns = (): CFSign[] => [...signs];

export const getSign = (id: string): CFSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CFSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CFCategory): CFSign[] =>
  signs.filter((s) => s.category === category);
