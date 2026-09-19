import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KGCategory, KGSign } from './types';
import { signs } from './signs.generated';

export type { KGCategory, KGSign } from './types';
export { signs };

export const getAllSigns = (): KGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KGCategory): KGSign[] =>
  coreGetSignsByCategory(signs, category);
