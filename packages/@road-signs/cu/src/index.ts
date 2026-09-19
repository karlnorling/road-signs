import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CUCategory, CUSign } from './types';
import { signs } from './signs.generated';

export type { CUCategory, CUSign } from './types';
export { signs };

export const getAllSigns = (): CUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CUCategory): CUSign[] =>
  coreGetSignsByCategory(signs, category);
