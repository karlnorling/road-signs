import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { VCCategory, VCSign } from './types';
import { signs } from './signs.generated';

export type { VCCategory, VCSign } from './types';
export { signs };

export const getAllSigns = (): VCSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): VCSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): VCSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: VCCategory): VCSign[] =>
  coreGetSignsByCategory(signs, category);
