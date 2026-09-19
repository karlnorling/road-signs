import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ATCategory, ATSign } from './types';
import { signs } from './signs.generated';

export type { ATCategory, ATSign } from './types';
export { signs };

export const getAllSigns = (): ATSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ATSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ATSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ATCategory): ATSign[] =>
  coreGetSignsByCategory(signs, category);
