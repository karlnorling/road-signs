import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { UGCategory, UGSign } from './types';
import { signs } from './signs.generated';

export type { UGCategory, UGSign } from './types';
export { signs };

export const getAllSigns = (): UGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): UGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): UGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: UGCategory): UGSign[] =>
  coreGetSignsByCategory(signs, category);
