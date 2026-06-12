/**
 * scrape-ro.ts — Romania
 *
 * Romanian signs follow the Vienna Convention (Codul rutier).
 * Wikipedia uses "Regulatory signs" (→ prohibitory) and "Information signs".
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E-F (information).
 *
 * Run via: yarn update --country=ro
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ro',
  country: 'Romania',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Romania',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Romania'],
});
