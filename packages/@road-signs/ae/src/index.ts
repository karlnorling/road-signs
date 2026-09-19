import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { AECategory, AESign } from './types';
import { signs } from './signs.generated';

export type { AECategory, AESign } from './types';
export { signs };

export const getAllSigns = (): AESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): AESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): AESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: AECategory): AESign[] =>
  coreGetSignsByCategory(signs, category);
