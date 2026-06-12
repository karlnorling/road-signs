import type { BTCategory, BTSign } from './types';
import { signs } from './signs.generated';

export type { BTCategory, BTSign } from './types';
export { signs };

export const getAllSigns = (): BTSign[] => [...signs];

export const getSign = (id: string): BTSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): BTSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: BTCategory): BTSign[] =>
  signs.filter((s) => s.category === category);
