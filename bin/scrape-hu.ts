/**
 * scrape-hu.ts — Hungary
 *
 * Hungarian signs follow the Vienna Convention (KRESZ).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E–T (information).
 *
 * Run via: yarn update --country=hu
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'hu',
  country: 'Hungary',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Hungary',
  headingMapExtra: [
    { pattern: 'indication', category: 'information' },
    { pattern: 'additional', category: 'information' },
    { pattern: 'tourist', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Hungary'],
});
