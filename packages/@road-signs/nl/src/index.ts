import type { NLCategory, NLSign } from './types.js';
import { signs } from './signs.generated.js';

export type { NLCategory, NLSign } from './types.js';
export { signs };

export const getAllSigns = (): NLSign[] => [...signs];

export const getSign = (id: string): NLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NLCategory): NLSign[] =>
  signs.filter((s) => s.category === category);
