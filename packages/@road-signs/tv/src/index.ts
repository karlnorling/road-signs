import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TVCategory, TVSign } from './types';
import { signs } from './signs.generated';

export type { TVCategory, TVSign } from './types';
export { signs };

export const getAllSigns = (): TVSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TVSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TVSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TVCategory): TVSign[] =>
  coreGetSignsByCategory(signs, category);
