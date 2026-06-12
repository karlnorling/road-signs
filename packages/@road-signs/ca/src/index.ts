import type { CACategory, CASign } from './types';
import { signs } from './signs.generated';

export type { CACategory, CASign } from './types';
export { signs };

export const getAllSigns = (): CASign[] => [...signs];

export const getSign = (id: string): CASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): CASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: CACategory): CASign[] =>
  signs.filter((s) => s.category === category);
