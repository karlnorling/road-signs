import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { CLCategory, CLSign } from './types';
import { signs } from './signs.generated';

export type { CLCategory, CLSign } from './types';
export { signs };

export const getAllSigns = (): CLSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): CLSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): CLSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: CLCategory): CLSign[] =>
  coreGetSignsByCategory(signs, category);
