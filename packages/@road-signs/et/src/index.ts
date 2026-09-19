import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { ETCategory, ETSign } from './types';
import { signs } from './signs.generated';

export type { ETCategory, ETSign } from './types';
export { signs };

export const getAllSigns = (): ETSign[] => coreGetAllSigns(signs);

export const getSign = (id: string): ETSign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): ETSign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: ETCategory): ETSign[] =>
  coreGetSignsByCategory(signs, category);
