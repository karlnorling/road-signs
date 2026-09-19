import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NLCategory, NLSign } from './types';
import { signs } from './signs.generated';

export type { NLCategory, NLSign } from './types';
export { signs };

export const getAllSigns = (): NLSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NLSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NLSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NLCategory): NLSign[] =>
  coreGetSignsByCategory(signs, category);
