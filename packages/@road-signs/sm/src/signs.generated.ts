// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
// Run 'yarn update --country=sm' to regenerate.
// Sharded across 4 files because the combined registry exceeded 30MB.

import type { SMSign } from './types';
import { signs_Warning } from './signs.warning.generated';
import { signs_Prohibitory } from './signs.prohibitory.generated';
import { signs_Information1 } from './signs.information_1.generated';
import { signs_Information2 } from './signs.information_2.generated';

export const signs: SMSign[] = [
  ...signs_Warning,
  ...signs_Prohibitory,
  ...signs_Information1,
  ...signs_Information2,
];
