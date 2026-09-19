import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KWCategory, KWSign } from './types';
import { signs } from './signs.generated';

export type { KWCategory, KWSign } from './types';
export { signs };

export const getAllSigns = (): KWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KWCategory): KWSign[] =>
  coreGetSignsByCategory(signs, category);
