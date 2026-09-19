import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { COCategory, COSign } from './types';
import { signs } from './signs.generated';

export type { COCategory, COSign } from './types';
export { signs };

export const getAllSigns = (): COSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): COSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): COSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: COCategory): COSign[] =>
  coreGetSignsByCategory(signs, category);
