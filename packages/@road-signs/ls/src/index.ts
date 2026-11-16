import type { LSCategory, LSSign } from './types.js';
import { signs } from './signs.generated.js';

export type { LSCategory, LSSign } from './types.js';
export { signs };

export const getAllSigns = (): LSSign[] => [...signs];

export const getSign = (id: string): LSSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): LSSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: LSCategory): LSSign[] =>
  signs.filter((s) => s.category === category);
