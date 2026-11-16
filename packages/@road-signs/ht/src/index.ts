import type { HTCategory, HTSign } from './types.js';
import { signs } from './signs.generated.js';

export type { HTCategory, HTSign } from './types.js';
export { signs };

export const getAllSigns = (): HTSign[] => [...signs];

export const getSign = (id: string): HTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): HTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: HTCategory): HTSign[] =>
  signs.filter((s) => s.category === category);
