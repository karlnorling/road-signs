import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SNCategory, SNSign } from './types';
import { signs } from './signs.generated';

export type { SNCategory, SNSign } from './types';
export { signs };

export const getAllSigns = (): SNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SNCategory): SNSign[] =>
  coreGetSignsByCategory(signs, category);
