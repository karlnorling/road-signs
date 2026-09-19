import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BHCategory, BHSign } from './types';
import { signs } from './signs.generated';

export type { BHCategory, BHSign } from './types';
export { signs };

export const getAllSigns = (): BHSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BHSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BHSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BHCategory): BHSign[] =>
  coreGetSignsByCategory(signs, category);
