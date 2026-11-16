import type { ILCategory, ILSign } from './types.js';
import { signs } from './signs.generated.js';

export type { ILCategory, ILSign } from './types.js';
export { signs };

export const getAllSigns = (): ILSign[] => [...signs];

export const getSign = (id: string): ILSign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): ILSign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: ILCategory): ILSign[] =>
  signs.filter((s) => s.category === category);
