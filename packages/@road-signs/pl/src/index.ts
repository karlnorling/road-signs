import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PLCategory, PLSign } from './types';
import { signs } from './signs.generated';

export type { PLCategory, PLSign } from './types';
export { signs };

export const getAllSigns = (): PLSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PLSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PLSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PLCategory): PLSign[] =>
  coreGetSignsByCategory(signs, category);
