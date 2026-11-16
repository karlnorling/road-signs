import type { ITCategory, ITSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ITCategory, ITSign } from './types.js';
export { signs };

export const getAllSigns = (): ITSign[] => [...signs];

export const getSign = (id: string): ITSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ITSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ITCategory): ITSign[] =>
  signs.filter((s) => s.category === category);
