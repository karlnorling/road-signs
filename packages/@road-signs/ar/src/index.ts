import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ARCategory, ARSign } from './types';
import { signs } from './signs.generated';

export type { ARCategory, ARSign } from './types';
export { signs };

export const getAllSigns = (): ARSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ARSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ARSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ARCategory): ARSign[] =>
  coreGetSignsByCategory(signs, category);
