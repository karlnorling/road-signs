import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TWCategory, TWSign } from './types';
import { signs } from './signs.generated';

export type { TWCategory, TWSign } from './types';
export { signs };

export const getAllSigns = (): TWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TWCategory): TWSign[] =>
  coreGetSignsByCategory(signs, category);
