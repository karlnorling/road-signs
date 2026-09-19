import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MMCategory, MMSign } from './types';
import { signs } from './signs.generated';

export type { MMCategory, MMSign } from './types';
export { signs };

export const getAllSigns = (): MMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MMCategory): MMSign[] =>
  coreGetSignsByCategory(signs, category);
