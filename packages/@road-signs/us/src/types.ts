import type { Sign } from '@road-signs/core';

export type USCategory =
  | 'construction'
  | 'guide'
  | 'informational'
  | 'recreational'
  | 'regulatory'
  | 'school'
  | 'warning';

/** A US road sign. `code` holds its MUTCD sign code, e.g. "W1-1". */
export type USSign = Sign<USCategory>;
