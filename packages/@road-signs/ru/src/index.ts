import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { RUCategory, RUSign } from './types';
import { signs } from './signs.generated';

export type { RUCategory, RUSign } from './types';
export { signs };

export const getAllSigns = (): RUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): RUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): RUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: RUCategory): RUSign[] =>
  coreGetSignsByCategory(signs, category);
