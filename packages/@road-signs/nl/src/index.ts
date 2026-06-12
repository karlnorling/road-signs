import type { NLCategory, NLSign } from './types';
import { signs } from './signs.generated';

export type { NLCategory, NLSign } from './types';
export { signs };

export const getAllSigns = (): NLSign[] => [...signs];

export const getSign = (id: string): NLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NLCategory): NLSign[] =>
  signs.filter((s) => s.category === category);
