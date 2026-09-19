import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { VNCategory, VNSign } from './types';
import { signs } from './signs.generated';

export type { VNCategory, VNSign } from './types';
export { signs };

export const getAllSigns = (): VNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): VNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): VNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: VNCategory): VNSign[] =>
  coreGetSignsByCategory(signs, category);
