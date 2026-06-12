/**
 * scrape-sk.ts — Slovakia
 *
 * Slovak signs follow the Vienna Convention (zákon č. 8/2009 Z. z.).
 * Codes: A (warning), B (priority/prohibitory), C (mandatory), IP/IJ/IS (information).
 *
 * Run via: yarn update --country=sk
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'sk',
  country: 'Slovakia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Slovakia',
  headingMapExtra: [
    { pattern: 'prohibitive', category: 'prohibitory' },
    { pattern: 'restrictive', category: 'prohibitory' },
    { pattern: 'service', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Slovakia'],
});
