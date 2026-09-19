import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { JPCategory, JPSign } from './types';
import { signs } from './signs.generated';

export type { JPCategory, JPSign } from './types';
export { signs };

export const getAllSigns = (): JPSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): JPSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): JPSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: JPCategory): JPSign[] =>
  coreGetSignsByCategory(signs, category);
