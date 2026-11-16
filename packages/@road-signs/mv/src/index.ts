import type { MVCategory, MVSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MVCategory, MVSign } from './types.js';
export { signs };

export const getAllSigns = (): MVSign[] => [...signs];

export const getSign = (id: string): MVSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MVSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MVCategory): MVSign[] =>
  signs.filter((s) => s.category === category);
