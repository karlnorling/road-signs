import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MXCategory, MXSign } from './types';
import { signs } from './signs.generated';

export type { MXCategory, MXSign } from './types';
export { signs };

export const getAllSigns = (): MXSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MXSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MXSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MXCategory): MXSign[] =>
  coreGetSignsByCategory(signs, category);
