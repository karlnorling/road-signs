import type { MLCategory, MLSign } from './types';
import { signs } from './signs.generated';

export type { MLCategory, MLSign } from './types';
export { signs };

export const getAllSigns = (): MLSign[] => [...signs];

export const getSign = (id: string): MLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MLCategory): MLSign[] =>
  signs.filter((s) => s.category === category);
