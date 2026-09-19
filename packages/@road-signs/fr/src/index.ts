import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { FRCategory, FRSign } from './types';
import { signs } from './signs.generated';

export type { FRCategory, FRSign } from './types';
export { signs };

export const getAllSigns = (): FRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): FRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): FRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: FRCategory): FRSign[] =>
  coreGetSignsByCategory(signs, category);
