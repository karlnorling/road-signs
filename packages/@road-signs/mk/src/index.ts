import type { MKCategory, MKSign } from './types';
import { signs } from './signs.generated';

export type { MKCategory, MKSign } from './types';
export { signs };

export const getAllSigns = (): MKSign[] => [...signs];

export const getSign = (id: string): MKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MKCategory): MKSign[] =>
  signs.filter((s) => s.category === category);
