import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SOCategory, SOSign } from './types';
import { signs } from './signs.generated';

export type { SOCategory, SOSign } from './types';
export { signs };

export const getAllSigns = (): SOSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SOSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SOSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SOCategory): SOSign[] =>
  coreGetSignsByCategory(signs, category);
