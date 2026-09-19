import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SGCategory, SGSign } from './types';
import { signs } from './signs.generated';

export type { SGCategory, SGSign } from './types';
export { signs };

export const getAllSigns = (): SGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SGCategory): SGSign[] =>
  coreGetSignsByCategory(signs, category);
