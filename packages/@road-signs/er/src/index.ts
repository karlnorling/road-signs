import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ERCategory, ERSign } from './types';
import { signs } from './signs.generated';

export type { ERCategory, ERSign } from './types';
export { signs };

export const getAllSigns = (): ERSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ERSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ERSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ERCategory): ERSign[] =>
  coreGetSignsByCategory(signs, category);
