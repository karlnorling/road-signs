import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MUCategory, MUSign } from './types';
import { signs } from './signs.generated';

export type { MUCategory, MUSign } from './types';
export { signs };

export const getAllSigns = (): MUSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MUSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MUSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MUCategory): MUSign[] =>
  coreGetSignsByCategory(signs, category);
