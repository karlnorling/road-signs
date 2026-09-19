import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PSCategory, PSSign } from './types';
import { signs } from './signs.generated';

export type { PSCategory, PSSign } from './types';
export { signs };

export const getAllSigns = (): PSSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PSSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PSSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PSCategory): PSSign[] =>
  coreGetSignsByCategory(signs, category);
