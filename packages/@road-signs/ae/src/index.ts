import type { AECategory, AESign } from './types.js';
import { signs } from './signs.generated.js';

export type { AECategory, AESign } from './types.js';
export { signs };

export const getAllSigns = (): AESign[] => [...signs];

export const getSign = (id: string): AESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): AESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: AECategory): AESign[] =>
  signs.filter((s) => s.category === category);
