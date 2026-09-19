import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NZCategory, NZSign } from './types';
import { signs } from './signs.generated';

export type { NZCategory, NZSign } from './types';
export { signs };

export const getAllSigns = (): NZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NZCategory): NZSign[] =>
  coreGetSignsByCategory(signs, category);
