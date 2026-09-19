import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { THCategory, THSign } from './types';
import { signs } from './signs.generated';

export type { THCategory, THSign } from './types';
export { signs };

export const getAllSigns = (): THSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): THSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): THSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: THCategory): THSign[] =>
  coreGetSignsByCategory(signs, category);
