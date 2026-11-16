import type { NOCategory, NOSign } from './types.js';
import { signs } from './signs.generated.js';

export type { NOCategory, NOSign } from './types.js';
export { signs };

export const getAllSigns = (): NOSign[] => [...signs];

export const getSign = (id: string): NOSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NOSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NOCategory): NOSign[] =>
  signs.filter((s) => s.category === category);
