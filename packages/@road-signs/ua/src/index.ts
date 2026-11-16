import type { UACategory, UASign } from './types.js';
import { signs } from './signs.generated.js';

export type { UACategory, UASign } from './types.js';
export { signs };

export const getAllSigns = (): UASign[] => [...signs];

export const getSign = (id: string): UASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): UASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: UACategory): UASign[] =>
  signs.filter((s) => s.category === category);
