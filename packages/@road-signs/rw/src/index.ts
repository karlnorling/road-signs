import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { RWCategory, RWSign } from './types';
import { signs } from './signs.generated';

export type { RWCategory, RWSign } from './types';
export { signs };

export const getAllSigns = (): RWSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): RWSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): RWSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: RWCategory): RWSign[] =>
  coreGetSignsByCategory(signs, category);
