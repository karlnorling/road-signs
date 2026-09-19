import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { FICategory, FISign } from './types';
import { signs } from './signs.generated';

export type { FICategory, FISign } from './types';
export { signs };

export const getAllSigns = (): FISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): FISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): FISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: FICategory): FISign[] =>
  coreGetSignsByCategory(signs, category);
