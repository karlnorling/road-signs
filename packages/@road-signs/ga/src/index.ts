import type { GACategory, GASign } from './types.js';
import { signs } from './signs.generated.js';

export type { GACategory, GASign } from './types.js';
export { signs };

export const getAllSigns = (): GASign[] => [...signs];

export const getSign = (id: string): GASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): GASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: GACategory): GASign[] =>
  signs.filter((s) => s.category === category);
