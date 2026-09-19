import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ZWCategory, ZWSign } from './types';
import { signs } from './signs.generated';

export type { ZWCategory, ZWSign } from './types';
export { signs };

export const getAllSigns = (): ZWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ZWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ZWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ZWCategory): ZWSign[] =>
  coreGetSignsByCategory(signs, category);
