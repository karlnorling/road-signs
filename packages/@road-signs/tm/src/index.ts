import type { TMCategory, TMSign } from './types';
import { signs } from './signs.generated';

export type { TMCategory, TMSign } from './types';
export { signs };

export const getAllSigns = (): TMSign[] => [...signs];

export const getSign = (id: string): TMSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TMSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TMCategory): TMSign[] =>
  signs.filter((s) => s.category === category);
