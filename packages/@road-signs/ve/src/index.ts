import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { VECategory, VESign } from './types';
import { signs } from './signs.generated';

export type { VECategory, VESign } from './types';
export { signs };

export const getAllSigns = (): VESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): VESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): VESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: VECategory): VESign[] =>
  coreGetSignsByCategory(signs, category);
