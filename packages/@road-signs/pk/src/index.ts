import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PKCategory, PKSign } from './types';
import { signs } from './signs.generated';

export type { PKCategory, PKSign } from './types';
export { signs };

export const getAllSigns = (): PKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PKCategory): PKSign[] =>
  coreGetSignsByCategory(signs, category);
