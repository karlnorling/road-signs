import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TTCategory, TTSign } from './types';
import { signs } from './signs.generated';

export type { TTCategory, TTSign } from './types';
export { signs };

export const getAllSigns = (): TTSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TTSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TTSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TTCategory): TTSign[] =>
  coreGetSignsByCategory(signs, category);
