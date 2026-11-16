import type { DECategory, DESign } from './types.js';
import { signs } from './signs.generated.js';

export type { DECategory, DESign } from './types.js';
export { signs };

export const getAllSigns = (): DESign[] => [...signs];

export const getSign = (id: string): DESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DECategory): DESign[] =>
  signs.filter((s) => s.category === category);
