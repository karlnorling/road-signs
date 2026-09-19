import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MVCategory, MVSign } from './types';
import { signs } from './signs.generated';

export type { MVCategory, MVSign } from './types';
export { signs };

export const getAllSigns = (): MVSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MVSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MVSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MVCategory): MVSign[] =>
  coreGetSignsByCategory(signs, category);
