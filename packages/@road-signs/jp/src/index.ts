import type { JPCategory, JPSign } from './types.js';
import { signs } from './signs.generated.js';

export type { JPCategory, JPSign } from './types.js';
export { signs };

export const getAllSigns = (): JPSign[] => [...signs];

export const getSign = (id: string): JPSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): JPSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: JPCategory): JPSign[] =>
  signs.filter((s) => s.category === category);
