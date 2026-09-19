import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ITCategory, ITSign } from './types';
import { signs } from './signs.generated';

export type { ITCategory, ITSign } from './types';
export { signs };

export const getAllSigns = (): ITSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ITSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ITSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ITCategory): ITSign[] =>
  coreGetSignsByCategory(signs, category);
