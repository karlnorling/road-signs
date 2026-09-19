import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BFCategory, BFSign } from './types';
import { signs } from './signs.generated';

export type { BFCategory, BFSign } from './types';
export { signs };

export const getAllSigns = (): BFSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BFSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BFSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BFCategory): BFSign[] =>
  coreGetSignsByCategory(signs, category);
