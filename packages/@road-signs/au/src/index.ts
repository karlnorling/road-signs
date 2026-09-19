import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AUCategory, AUSign } from './types';
import { signs } from './signs.generated';

export type { AUCategory, AUSign } from './types';
export { signs };

export const getAllSigns = (): AUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AUCategory): AUSign[] =>
  coreGetSignsByCategory(signs, category);
