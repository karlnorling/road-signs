import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ZMCategory, ZMSign } from './types';
import { signs } from './signs.generated';

export type { ZMCategory, ZMSign } from './types';
export { signs };

export const getAllSigns = (): ZMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ZMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ZMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ZMCategory): ZMSign[] =>
  coreGetSignsByCategory(signs, category);
