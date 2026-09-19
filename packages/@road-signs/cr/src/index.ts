import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CRCategory, CRSign } from './types';
import { signs } from './signs.generated';

export type { CRCategory, CRSign } from './types';
export { signs };

export const getAllSigns = (): CRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CRCategory): CRSign[] =>
  coreGetSignsByCategory(signs, category);
