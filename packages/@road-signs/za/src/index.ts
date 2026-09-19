import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ZACategory, ZASign } from './types';
import { signs } from './signs.generated';

export type { ZACategory, ZASign } from './types';
export { signs };

export const getAllSigns = (): ZASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ZASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ZASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ZACategory): ZASign[] =>
  coreGetSignsByCategory(signs, category);
