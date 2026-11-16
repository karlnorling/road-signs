import type { IRCategory, IRSign } from './types.js';
import { signs } from './signs.generated.js';

export type { IRCategory, IRSign } from './types.js';
export { signs };

export const getAllSigns = (): IRSign[] => [...signs];

export const getSign = (id: string): IRSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): IRSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: IRCategory): IRSign[] =>
  signs.filter((s) => s.category === category);
