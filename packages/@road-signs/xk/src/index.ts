import type { XKCategory, XKSign } from './types';
import { signs } from './signs.generated';

export type { XKCategory, XKSign } from './types';
export { signs };

export const getAllSigns = (): XKSign[] => [...signs];

export const getSign = (id: string): XKSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): XKSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: XKCategory): XKSign[] =>
  signs.filter((s) => s.category === category);
