import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SKCategory, SKSign } from './types';
import { signs } from './signs.generated';

export type { SKCategory, SKSign } from './types';
export { signs };

export const getAllSigns = (): SKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SKCategory): SKSign[] =>
  coreGetSignsByCategory(signs, category);
