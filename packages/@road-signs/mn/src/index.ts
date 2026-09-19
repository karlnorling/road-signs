import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { MNCategory, MNSign } from './types';
import { signs } from './signs.generated';

export type { MNCategory, MNSign } from './types';
export { signs };

export const getAllSigns = (): MNSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): MNSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): MNSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: MNCategory): MNSign[] =>
  coreGetSignsByCategory(signs, category);
