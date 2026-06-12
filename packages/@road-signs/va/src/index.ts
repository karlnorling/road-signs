/**
 * @road-signs/va — Vatican City road signs.
 *
 * Vatican City is fully integrated into the Italian road-sign system
 * (Codice della Strada). Rather than ship a duplicate registry, this
 * package re-exports the Italian catalogue under VA-prefixed names.
 */

import {
  signs,
  getAllSigns as itGetAllSigns,
  getSign as itGetSign,
  getSignByCode as itGetSignByCode,
  getSignsByCategory as itGetSignsByCategory,
} from '@road-signs/it';
import type { ITCategory, ITSign } from '@road-signs/it';

export type { ITCategory as VACategory, ITSign as VASign } from '@road-signs/it';

export { signs };

export const getAllSigns = (): ITSign[] => itGetAllSigns();

export const getSign = (id: string): ITSign | undefined => itGetSign(id);

export const getSignByCode = (code: string): ITSign | undefined => itGetSignByCode(code);

export const getSignsByCategory = (category: ITCategory): ITSign[] =>
  itGetSignsByCategory(category);
