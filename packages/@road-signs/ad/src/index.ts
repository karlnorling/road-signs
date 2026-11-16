import type { ADCategory, ADSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ADCategory, ADSign } from './types.js';
export { signs };

export const getAllSigns = (): ADSign[] => [...signs];

export const getSign = (id: string): ADSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ADSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ADCategory): ADSign[] =>
  signs.filter((s) => s.category === category);
