import type { EECategory, EESign } from './types';
import { signs } from './signs.generated';

export type { EECategory, EESign } from './types';
export { signs };

export const getAllSigns = (): EESign[] => [...signs];

export const getSign = (id: string): EESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): EESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: EECategory): EESign[] =>
  signs.filter((s) => s.category === category);
