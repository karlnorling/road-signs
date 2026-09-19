import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { UACategory, UASign } from './types';
import { signs } from './signs.generated';

export type { UACategory, UASign } from './types';
export { signs };

export const getAllSigns = (): UASign[] => coreGetAllSigns(signs);

export const getSign = (id: string): UASign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): UASign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: UACategory): UASign[] =>
  coreGetSignsByCategory(signs, category);
