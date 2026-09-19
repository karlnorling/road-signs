import type { Sign } from '@road-signs/core';

export type CACategory = 'information' | 'regulatory' | 'school' | 'temporary' | 'warning';

/** A CA road sign. `code` holds its MUTCDC sign code, e.g. "RA-2". */
export type CASign = Sign<CACategory>;
