import type { Sign } from '@road-signs/core';

export type UKCategory = 'direction' | 'information' | 'regulatory' | 'temporary' | 'warning';

/** A UK road sign. `code` holds its TSRGD diagram number, e.g. "601", "2025". */
export type UKSign = Sign<UKCategory>;
