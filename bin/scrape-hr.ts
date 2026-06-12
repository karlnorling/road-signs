/**
 * scrape-hr.ts — Croatia
 *
 * Croatian signs follow the Vienna Convention (Zakon o sigurnosti prometa na cestama).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E-F (information).
 *
 * Run via: yarn update --country=hr
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'hr',
  country: 'Croatia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Croatia',
  headingMapExtra: [
    { pattern: 'restriction', category: 'prohibitory' },
    { pattern: 'tourist', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Croatia'],
});
