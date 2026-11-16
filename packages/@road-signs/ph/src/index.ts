import type { PHCategory, PHSign } from './types.js';
import { signs } from './signs.generated.js';

export type { PHCategory, PHSign } from './types.js';
export { signs };

export const getAllSigns = (): PHSign[] => [...signs];

export const getSign = (id: string): PHSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): PHSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: PHCategory): PHSign[] =>
  signs.filter((s) => s.category === category);
