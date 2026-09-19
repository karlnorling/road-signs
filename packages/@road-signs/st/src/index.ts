import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { STCategory, STSign } from './types';
import { signs } from './signs.generated';

export type { STCategory, STSign } from './types';
export { signs };

export const getAllSigns = (): STSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): STSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): STSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: STCategory): STSign[] =>
  coreGetSignsByCategory(signs, category);
