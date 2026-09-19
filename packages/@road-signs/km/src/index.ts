import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KMCategory, KMSign } from './types';
import { signs } from './signs.generated';

export type { KMCategory, KMSign } from './types';
export { signs };

export const getAllSigns = (): KMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KMCategory): KMSign[] =>
  coreGetSignsByCategory(signs, category);
