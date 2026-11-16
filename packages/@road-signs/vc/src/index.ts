import type { VCCategory, VCSign } from './types.js';
import { signs } from './signs.generated.js';

export type { VCCategory, VCSign } from './types.js';
export { signs };

export const getAllSigns = (): VCSign[] => [...signs];

export const getSign = (id: string): VCSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): VCSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: VCCategory): VCSign[] =>
  signs.filter((s) => s.category === category);
