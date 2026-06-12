import type { Sign } from '@road-signs/core';

export type CACategory =
  | 'information'
  | 'regulatory'
  | 'school'
  | 'temporary'
  | 'warning';

export interface CASign extends Sign<CACategory> {
  /** MUTCDC sign code, e.g. "RA-2". Alias for Sign.code. */
  code: string;
}
