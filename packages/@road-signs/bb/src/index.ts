import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { BBCategory, BBSign } from './types';
import { signs } from './signs.generated';

export type { BBCategory, BBSign } from './types';
export { signs };

export const getAllSigns = (): BBSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): BBSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): BBSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: BBCategory): BBSign[] =>
  coreGetSignsByCategory(signs, category);
