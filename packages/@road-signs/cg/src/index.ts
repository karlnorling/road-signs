import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CGCategory, CGSign } from './types';
import { signs } from './signs.generated';

export type { CGCategory, CGSign } from './types';
export { signs };

export const getAllSigns = (): CGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CGCategory): CGSign[] =>
  coreGetSignsByCategory(signs, category);
