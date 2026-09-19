import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KZCategory, KZSign } from './types';
import { signs } from './signs.generated';

export type { KZCategory, KZSign } from './types';
export { signs };

export const getAllSigns = (): KZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KZCategory): KZSign[] =>
  coreGetSignsByCategory(signs, category);
