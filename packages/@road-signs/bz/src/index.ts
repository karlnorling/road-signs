import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BZCategory, BZSign } from './types';
import { signs } from './signs.generated';

export type { BZCategory, BZSign } from './types';
export { signs };

export const getAllSigns = (): BZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BZCategory): BZSign[] =>
  coreGetSignsByCategory(signs, category);
