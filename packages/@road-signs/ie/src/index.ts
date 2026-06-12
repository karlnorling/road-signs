import type { IECategory, IESign } from './types';
import { signs } from './signs.generated';

export type { IECategory, IESign } from './types';
export { signs };

export const getAllSigns = (): IESign[] => [...signs];

export const getSign = (id: string): IESign | undefined =>
  signs.find((s) => s.id === id);

export const getSignByCode = (code: string): IESign | undefined =>
  signs.find((s) => s.code === code);

export const getSignsByCategory = (category: IECategory): IESign[] =>
  signs.filter((s) => s.category === category);
