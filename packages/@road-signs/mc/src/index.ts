import type { MCCategory, MCSign } from './types';
import { signs } from './signs.generated';

export type { MCCategory, MCSign } from './types';
export { signs };

export const getAllSigns = (): MCSign[] => [...signs];

export const getSign = (id: string): MCSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MCSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MCCategory): MCSign[] =>
  signs.filter((s) => s.category === category);
