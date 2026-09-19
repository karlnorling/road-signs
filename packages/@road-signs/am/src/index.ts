import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AMCategory, AMSign } from './types';
import { signs } from './signs.generated';

export type { AMCategory, AMSign } from './types';
export { signs };

export const getAllSigns = (): AMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AMCategory): AMSign[] =>
  coreGetSignsByCategory(signs, category);
