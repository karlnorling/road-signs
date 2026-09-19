import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { HTCategory, HTSign } from './types';
import { signs } from './signs.generated';

export type { HTCategory, HTSign } from './types';
export { signs };

export const getAllSigns = (): HTSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): HTSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): HTSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: HTCategory): HTSign[] =>
  coreGetSignsByCategory(signs, category);
