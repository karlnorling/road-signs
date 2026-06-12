import type { DKCategory, DKSign } from './types';
import { signs } from './signs.generated';

export type { DKCategory, DKSign } from './types';
export { signs };

export const getAllSigns = (): DKSign[] => [...signs];

export const getSign = (id: string): DKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): DKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: DKCategory): DKSign[] =>
  signs.filter((s) => s.category === category);
