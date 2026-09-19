import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { KECategory, KESign } from './types';
import { signs } from './signs.generated';

export type { KECategory, KESign } from './types';
export { signs };

export const getAllSigns = (): KESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): KESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): KESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: KECategory): KESign[] =>
  coreGetSignsByCategory(signs, category);
