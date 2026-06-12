import type { ROCategory, ROSign } from './types';
import { signs } from './signs.generated';

export type { ROCategory, ROSign } from './types';
export { signs };

export const getAllSigns = (): ROSign[] => [...signs];

export const getSign = (id: string): ROSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ROSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ROCategory): ROSign[] =>
  signs.filter((s) => s.category === category);
