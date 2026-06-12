import type { Sign } from '@road-signs/core';

export type UKCategory =
  | 'direction'
  | 'information'
  | 'regulatory'
  | 'temporary'
  | 'warning';

export interface UKSign extends Sign<UKCategory> {
  /** TSRGD diagram number, e.g. "601", "2025". Alias for Sign.code. */
  code: string;
}
