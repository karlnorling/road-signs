import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { RSCategory, RSSign } from './types';
import { signs } from './signs.generated';

export type { RSCategory, RSSign } from './types';
export { signs };

export const getAllSigns = (): RSSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): RSSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): RSSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: RSCategory): RSSign[] =>
  coreGetSignsByCategory(signs, category);
