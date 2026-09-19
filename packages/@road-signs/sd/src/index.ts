import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SDCategory, SDSign } from './types';
import { signs } from './signs.generated';

export type { SDCategory, SDSign } from './types';
export { signs };

export const getAllSigns = (): SDSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SDSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SDSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SDCategory): SDSign[] =>
  coreGetSignsByCategory(signs, category);
