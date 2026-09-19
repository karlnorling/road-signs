import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TZCategory, TZSign } from './types';
import { signs } from './signs.generated';

export type { TZCategory, TZSign } from './types';
export { signs };

export const getAllSigns = (): TZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TZCategory): TZSign[] =>
  coreGetSignsByCategory(signs, category);
