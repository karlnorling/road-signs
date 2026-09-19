import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NICategory, NISign } from './types';
import { signs } from './signs.generated';

export type { NICategory, NISign } from './types';
export { signs };

export const getAllSigns = (): NISign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NISign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NISign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NICategory): NISign[] =>
  coreGetSignsByCategory(signs, category);
