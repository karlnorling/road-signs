import type { IECategory, IESign } from './types.js';
import { signs } from './signs.generated.js';

export type { IECategory, IESign } from './types.js';
export { signs };

export const getAllSigns = (): IESign[] => [...signs];

export const getSign = (id: string): IESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): IESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: IECategory): IESign[] =>
  signs.filter((s) => s.category === category);
