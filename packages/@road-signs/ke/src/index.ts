import type { KECategory, KESign } from './types';
import { signs } from './signs.generated';

export type { KECategory, KESign } from './types';
export { signs };

export const getAllSigns = (): KESign[] => [...signs];

export const getSign = (id: string): KESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): KESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: KECategory): KESign[] =>
  signs.filter((s) => s.category === category);
