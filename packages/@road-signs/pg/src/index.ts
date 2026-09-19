import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { PGCategory, PGSign } from './types';
import { signs } from './signs.generated';

export type { PGCategory, PGSign } from './types';
export { signs };

export const getAllSigns = (): PGSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): PGSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): PGSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: PGCategory): PGSign[] =>
  coreGetSignsByCategory(signs, category);
