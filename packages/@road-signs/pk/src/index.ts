import type { PKCategory, PKSign } from './types.js';
import { signs } from './signs.generated.js';

export type { PKCategory, PKSign } from './types.js';
export { signs };

export const getAllSigns = (): PKSign[] => [...signs];

export const getSign = (id: string): PKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PKCategory): PKSign[] =>
  signs.filter((s) => s.category === category);
