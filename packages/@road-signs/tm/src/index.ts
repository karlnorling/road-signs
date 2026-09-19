import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { TMCategory, TMSign } from './types';
import { signs } from './signs.generated';

export type { TMCategory, TMSign } from './types';
export { signs };

export const getAllSigns = (): TMSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): TMSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): TMSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: TMCategory): TMSign[] =>
  coreGetSignsByCategory(signs, category);
