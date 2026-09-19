import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BNCategory, BNSign } from './types';
import { signs } from './signs.generated';

export type { BNCategory, BNSign } from './types';
export { signs };

export const getAllSigns = (): BNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BNCategory): BNSign[] =>
  coreGetSignsByCategory(signs, category);
