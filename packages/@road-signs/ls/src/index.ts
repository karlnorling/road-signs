import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { LSCategory, LSSign } from './types';
import { signs } from './signs.generated';

export type { LSCategory, LSSign } from './types';
export { signs };

export const getAllSigns = (): LSSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): LSSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): LSSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: LSCategory): LSSign[] =>
  coreGetSignsByCategory(signs, category);
