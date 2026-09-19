import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TRCategory, TRSign } from './types';
import { signs } from './signs.generated';

export type { TRCategory, TRSign } from './types';
export { signs };

export const getAllSigns = (): TRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TRCategory): TRSign[] =>
  coreGetSignsByCategory(signs, category);
