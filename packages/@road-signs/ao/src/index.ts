import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AOCategory, AOSign } from './types';
import { signs } from './signs.generated';

export type { AOCategory, AOSign } from './types';
export { signs };

export const getAllSigns = (): AOSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AOSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AOSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AOCategory): AOSign[] =>
  coreGetSignsByCategory(signs, category);
