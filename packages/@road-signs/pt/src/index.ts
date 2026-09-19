import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PTCategory, PTSign } from './types';
import { signs } from './signs.generated';

export type { PTCategory, PTSign } from './types';
export { signs };

export const getAllSigns = (): PTSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PTSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PTSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PTCategory): PTSign[] =>
  coreGetSignsByCategory(signs, category);
