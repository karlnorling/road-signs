import type { AFCategory, AFSign } from './types.js';
import { signs } from './signs.generated.js';

export type { AFCategory, AFSign } from './types.js';
export { signs };

export const getAllSigns = (): AFSign[] => [...signs];

export const getSign = (id: string): AFSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AFSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AFCategory): AFSign[] =>
  signs.filter((s) => s.category === category);
