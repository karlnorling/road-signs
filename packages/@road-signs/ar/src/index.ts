import type { ARCategory, ARSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ARCategory, ARSign } from './types.js';
export { signs };

export const getAllSigns = (): ARSign[] => [...signs];

export const getSign = (id: string): ARSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ARSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ARCategory): ARSign[] =>
  signs.filter((s) => s.category === category);
