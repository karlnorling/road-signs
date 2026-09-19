import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CICategory, CISign } from './types';
import { signs } from './signs.generated';

export type { CICategory, CISign } from './types';
export { signs };

export const getAllSigns = (): CISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CICategory): CISign[] =>
  coreGetSignsByCategory(signs, category);
