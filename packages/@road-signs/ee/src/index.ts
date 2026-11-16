import type { EECategory, EESign } from './types.js';
import { signs } from './signs.generated.js';

export type { EECategory, EESign } from './types.js';
export { signs };

export const getAllSigns = (): EESign[] => [...signs];

export const getSign = (id: string): EESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): EESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: EECategory): EESign[] =>
  signs.filter((s) => s.category === category);
