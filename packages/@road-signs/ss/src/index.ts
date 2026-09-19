import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SSCategory, SSSign } from './types';
import { signs } from './signs.generated';

export type { SSCategory, SSSign } from './types';
export { signs };

export const getAllSigns = (): SSSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SSSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SSSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SSCategory): SSSign[] =>
  coreGetSignsByCategory(signs, category);
