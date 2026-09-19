import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BICategory, BISign } from './types';
import { signs } from './signs.generated';

export type { BICategory, BISign } from './types';
export { signs };

export const getAllSigns = (): BISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BICategory): BISign[] =>
  coreGetSignsByCategory(signs, category);
