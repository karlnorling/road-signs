import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BSCategory, BSSign } from './types';
import { signs } from './signs.generated';

export type { BSCategory, BSSign } from './types';
export { signs };

export const getAllSigns = (): BSSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BSSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BSSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BSCategory): BSSign[] =>
  coreGetSignsByCategory(signs, category);
