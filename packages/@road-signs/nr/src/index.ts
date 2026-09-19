import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { NRCategory, NRSign } from './types';
import { signs } from './signs.generated';

export type { NRCategory, NRSign } from './types';
export { signs };

export const getAllSigns = (): NRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): NRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): NRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: NRCategory): NRSign[] =>
  coreGetSignsByCategory(signs, category);
