import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { FMCategory, FMSign } from './types';
import { signs } from './signs.generated';

export type { FMCategory, FMSign } from './types';
export { signs };

export const getAllSigns = (): FMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): FMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): FMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: FMCategory): FMSign[] =>
  coreGetSignsByCategory(signs, category);
