import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BTCategory, BTSign } from './types';
import { signs } from './signs.generated';

export type { BTCategory, BTSign } from './types';
export { signs };

export const getAllSigns = (): BTSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BTSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BTSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BTCategory): BTSign[] =>
  coreGetSignsByCategory(signs, category);
