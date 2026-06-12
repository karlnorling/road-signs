import type { NOCategory, NOSign } from './types';
import { signs } from './signs.generated';

export type { NOCategory, NOSign } from './types';
export { signs };

export const getAllSigns = (): NOSign[] => [...signs];

export const getSign = (id: string): NOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NOCategory): NOSign[] =>
  signs.filter((s) => s.category === category);
