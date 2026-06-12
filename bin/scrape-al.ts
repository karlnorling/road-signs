/**
 * scrape-al.ts — Albania
 *
 * Albanian signs follow the Vienna Convention (Kodi Rrugor).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=al
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'al',
  country: 'Albania',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Albania',
  commonsCategories: ['SVG_road_signs_in_Albania'],
});
