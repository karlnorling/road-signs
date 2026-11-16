import type { BGCategory, BGSign } from './types.js';
import { signs } from './signs.generated.js';

export type { BGCategory, BGSign } from './types.js';
export { signs };

export const getAllSigns = (): BGSign[] => [...signs];

export const getSign = (id: string): BGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BGCategory): BGSign[] =>
  signs.filter((s) => s.category === category);
