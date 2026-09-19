import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MLCategory, MLSign } from './types';
import { signs } from './signs.generated';

export type { MLCategory, MLSign } from './types';
export { signs };

export const getAllSigns = (): MLSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MLSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MLSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MLCategory): MLSign[] =>
  coreGetSignsByCategory(signs, category);
