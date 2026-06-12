import type { ALCategory, ALSign } from './types';
import { signs } from './signs.generated';

export type { ALCategory, ALSign } from './types';
export { signs };

export const getAllSigns = (): ALSign[] => [...signs];

export const getSign = (id: string): ALSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ALSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ALCategory): ALSign[] =>
  signs.filter((s) => s.category === category);
