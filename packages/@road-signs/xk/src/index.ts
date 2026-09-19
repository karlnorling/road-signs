import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { XKCategory, XKSign } from './types';
import { signs } from './signs.generated';

export type { XKCategory, XKSign } from './types';
export { signs };

export const getAllSigns = (): XKSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): XKSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): XKSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: XKCategory): XKSign[] =>
  coreGetSignsByCategory(signs, category);
