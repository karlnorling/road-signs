import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MTCategory, MTSign } from './types';
import { signs } from './signs.generated';

export type { MTCategory, MTSign } from './types';
export { signs };

export const getAllSigns = (): MTSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MTSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MTSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MTCategory): MTSign[] =>
  coreGetSignsByCategory(signs, category);
