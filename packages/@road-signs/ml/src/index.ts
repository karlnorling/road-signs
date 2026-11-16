import type { MLCategory, MLSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MLCategory, MLSign } from './types.js';
export { signs };

export const getAllSigns = (): MLSign[] => [...signs];

export const getSign = (id: string): MLSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MLSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MLCategory): MLSign[] =>
  signs.filter((s) => s.category === category);
