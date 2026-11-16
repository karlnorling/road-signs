import type { WSCategory, WSSign } from './types.js';
import { signs } from './signs.generated.js';

export type { WSCategory, WSSign } from './types.js';
export { signs };

export const getAllSigns = (): WSSign[] => [...signs];

export const getSign = (id: string): WSSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): WSSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: WSCategory): WSSign[] =>
  signs.filter((s) => s.category === category);
