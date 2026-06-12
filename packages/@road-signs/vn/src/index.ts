import type { VNCategory, VNSign } from './types';
import { signs } from './signs.generated';

export type { VNCategory, VNSign } from './types';
export { signs };

export const getAllSigns = (): VNSign[] => [...signs];

export const getSign = (id: string): VNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): VNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: VNCategory): VNSign[] =>
  signs.filter((s) => s.category === category);
