import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MZCategory, MZSign } from './types';
import { signs } from './signs.generated';

export type { MZCategory, MZSign } from './types';
export { signs };

export const getAllSigns = (): MZSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MZSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MZSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MZCategory): MZSign[] =>
  coreGetSignsByCategory(signs, category);
