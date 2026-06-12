import type { VECategory, VESign } from './types';
import { signs } from './signs.generated';

export type { VECategory, VESign } from './types';
export { signs };

export const getAllSigns = (): VESign[] => [...signs];

export const getSign = (id: string): VESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): VESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: VECategory): VESign[] =>
  signs.filter((s) => s.category === category);
