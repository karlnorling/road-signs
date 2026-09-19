import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TOCategory, TOSign } from './types';
import { signs } from './signs.generated';

export type { TOCategory, TOSign } from './types';
export { signs };

export const getAllSigns = (): TOSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TOSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TOSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TOCategory): TOSign[] =>
  coreGetSignsByCategory(signs, category);
