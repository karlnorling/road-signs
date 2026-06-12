/**
 * scrape-ee.ts — Estonia
 *
 * Estonian signs follow the Vienna Convention (Liiklusseadus).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=ee
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'ee',
  country: 'Estonia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Estonia',
  commonsCategories: ['SVG_road_signs_in_Estonia'],
});
