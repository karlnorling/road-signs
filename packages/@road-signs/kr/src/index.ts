import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KRCategory, KRSign } from './types';
import { signs } from './signs.generated';

export type { KRCategory, KRSign } from './types';
export { signs };

export const getAllSigns = (): KRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KRCategory): KRSign[] =>
  coreGetSignsByCategory(signs, category);
