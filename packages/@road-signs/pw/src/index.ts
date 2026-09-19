import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PWCategory, PWSign } from './types';
import { signs } from './signs.generated';

export type { PWCategory, PWSign } from './types';
export { signs };

export const getAllSigns = (): PWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PWCategory): PWSign[] =>
  coreGetSignsByCategory(signs, category);
