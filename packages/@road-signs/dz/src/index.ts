import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { DZCategory, DZSign } from './types';
import { signs } from './signs.generated';

export type { DZCategory, DZSign } from './types';
export { signs };

export const getAllSigns = (): DZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): DZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): DZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: DZCategory): DZSign[] =>
  coreGetSignsByCategory(signs, category);
