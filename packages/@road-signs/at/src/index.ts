import type { ATCategory, ATSign } from './types';
import { signs } from './signs.generated';

export type { ATCategory, ATSign } from './types';
export { signs };

export const getAllSigns = (): ATSign[] => [...signs];

export const getSign = (id: string): ATSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ATSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ATCategory): ATSign[] =>
  signs.filter((s) => s.category === category);
