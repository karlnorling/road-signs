import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { SRCategory, SRSign } from './types';
import { signs } from './signs.generated';

export type { SRCategory, SRSign } from './types';
export { signs };

export const getAllSigns = (): SRSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): SRSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): SRSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: SRCategory): SRSign[] =>
  coreGetSignsByCategory(signs, category);
