import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SZCategory, SZSign } from './types';
import { signs } from './signs.generated';

export type { SZCategory, SZSign } from './types';
export { signs };

export const getAllSigns = (): SZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SZCategory): SZSign[] =>
  coreGetSignsByCategory(signs, category);
