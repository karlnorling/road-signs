import {
  getAllSigns as coreGetAllSigns,
  getSign as coreGetSign,
  getSignByCode as coreGetSignByCode,
  getSignsByCategory as coreGetSignsByCategory,
} from '@road-signs/core';
import type { EECategory, EESign } from './types';
import { signs } from './signs.generated';

export type { EECategory, EESign } from './types';
export { signs };

export const getAllSigns = (): EESign[] => coreGetAllSigns(signs);

export const getSign = (id: string): EESign | undefined => coreGetSign(signs, id);

export const getSignByCode = (code: string): EESign | undefined => coreGetSignByCode(signs, code);

export const getSignsByCategory = (category: EECategory): EESign[] =>
  coreGetSignsByCategory(signs, category);
