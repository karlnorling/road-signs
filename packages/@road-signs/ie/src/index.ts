import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { IECategory, IESign } from './types';
import { signs } from './signs.generated';

export type { IECategory, IESign } from './types';
export { signs };

export const getAllSigns = (): IESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): IESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): IESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: IECategory): IESign[] =>
  coreGetSignsByCategory(signs, category);
