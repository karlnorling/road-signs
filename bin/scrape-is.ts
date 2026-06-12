/**
 * scrape-is.ts — Iceland
 *
 * Icelandic signs follow the Vienna Convention (Umferðarlög).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=is
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'is',
  country: 'Iceland',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Iceland',
  commonsCategories: ['SVG_road_signs_in_Iceland', 'Road_signs_in_Iceland'],
});
