import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { DECategory, DESign } from './types';
import { signs } from './signs.generated';

export type { DECategory, DESign } from './types';
export { signs };

export const getAllSigns = (): DESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): DESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): DESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: DECategory): DESign[] =>
  coreGetSignsByCategory(signs, category);
