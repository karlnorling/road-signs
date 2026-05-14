import type { Sign } from '@road-signs/core';

export type USCategory =
  | 'construction'
  | 'guide'
  | 'informational'
  | 'recreational'
  | 'regulatory'
  | 'school'
  | 'warning';

export interface USSign extends Sign<USCategory> {
  /** MUTCD sign code, e.g. "W1-1". Alias for Sign.code. */
  code: string;
}
