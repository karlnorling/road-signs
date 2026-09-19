import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AFCategory, AFSign } from './types';
import { signs } from './signs.generated';

export type { AFCategory, AFSign } from './types';
export { signs };

export const getAllSigns = (): AFSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AFSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AFSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AFCategory): AFSign[] =>
  coreGetSignsByCategory(signs, category);
