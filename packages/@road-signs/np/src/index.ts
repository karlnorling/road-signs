import type { NPCategory, NPSign } from './types.js';
import { signs } from './signs.generated.js';

export type { NPCategory, NPSign } from './types.js';
export { signs };

export const getAllSigns = (): NPSign[] => [...signs];

export const getSign = (id: string): NPSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NPSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NPCategory): NPSign[] =>
  signs.filter((s) => s.category === category);
