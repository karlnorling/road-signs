import type { NACategory, NASign } from './types.js';
import { signs } from './signs.generated.js';

export type { NACategory, NASign } from './types.js';
export { signs };

export const getAllSigns = (): NASign[] => [...signs];

export const getSign = (id: string): NASign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): NASign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: NACategory): NASign[] =>
  signs.filter((s) => s.category === category);
