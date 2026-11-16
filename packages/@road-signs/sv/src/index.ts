import type { SVCategory, SVSign } from './types.js';
import { signs } from './signs.generated.js';

export type { SVCategory, SVSign } from './types.js';
export { signs };

export const getAllSigns = (): SVSign[] => [...signs];

export const getSign = (id: string): SVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): SVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: SVCategory): SVSign[] =>
  signs.filter((s) => s.category === category);
