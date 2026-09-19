import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AZCategory, AZSign } from './types';
import { signs } from './signs.generated';

export type { AZCategory, AZSign } from './types';
export { signs };

export const getAllSigns = (): AZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AZCategory): AZSign[] =>
  coreGetSignsByCategory(signs, category);
