import type { TGCategory, TGSign } from './types.js';
import { signs } from './signs.generated.js';

export type { TGCategory, TGSign } from './types.js';
export { signs };

export const getAllSigns = (): TGSign[] => [...signs];

export const getSign = (id: string): TGSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): TGSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: TGCategory): TGSign[] =>
  signs.filter((s) => s.category === category);
