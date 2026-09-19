import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { VUCategory, VUSign } from './types';
import { signs } from './signs.generated';

export type { VUCategory, VUSign } from './types';
export { signs };

export const getAllSigns = (): VUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): VUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): VUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: VUCategory): VUSign[] =>
  coreGetSignsByCategory(signs, category);
