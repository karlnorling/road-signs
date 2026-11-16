import type { ESCategory, ESSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ESCategory, ESSign } from './types.js';
export { signs };

export const getAllSigns = (): ESSign[] => [...signs];

export const getSign = (id: string): ESSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ESSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ESCategory): ESSign[] =>
  signs.filter((s) => s.category === category);
