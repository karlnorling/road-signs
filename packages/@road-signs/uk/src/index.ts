import type { UKCategory, UKSign } from './types';
import { signs } from './signs.generated';

export type { UKCategory, UKSign } from './types';
export { signs };

export const getAllSigns = (): UKSign[] => [...signs];

export const getSign = (id: string): UKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): UKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: UKCategory): UKSign[] =>
  signs.filter((s) => s.category === category);
