import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SACategory, SASign } from './types';
import { signs } from './signs.generated';

export type { SACategory, SASign } from './types';
export { signs };

export const getAllSigns = (): SASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SACategory): SASign[] =>
  coreGetSignsByCategory(signs, category);
