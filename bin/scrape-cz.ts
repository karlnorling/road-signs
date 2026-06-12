/**
 * scrape-cz.ts — Czech Republic
 *
 * Czech signs follow the Vienna Convention (zákon č. 361/2000 Sb.).
 * Codes: A (warning), B (priority/prohibitory), C (mandatory), IP/IJ (information).
 *
 * Run via: yarn update --country=cz
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'cz',
  country: 'Czech Republic',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Czech_Republic',
  headingMapExtra: [
    { pattern: 'prohibitive', category: 'prohibitory' },
    { pattern: 'restrictive', category: 'prohibitory' },
    { pattern: 'service', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_the_Czech_Republic'],
});
