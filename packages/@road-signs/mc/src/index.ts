import type { MCCategory, MCSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MCCategory, MCSign } from './types.js';
export { signs };

export const getAllSigns = (): MCSign[] => [...signs];

export const getSign = (id: string): MCSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MCSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MCCategory): MCSign[] =>
  signs.filter((s) => s.category === category);
