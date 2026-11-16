import type { MNCategory, MNSign } from './types.js';
import { signs } from './signs.generated.js';

export type { MNCategory, MNSign } from './types.js';
export { signs };

export const getAllSigns = (): MNSign[] => [...signs];

export const getSign = (id: string): MNSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): MNSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: MNCategory): MNSign[] =>
  signs.filter((s) => s.category === category);
