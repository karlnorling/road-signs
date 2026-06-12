/**
 * scrape-mt.ts — Malta
 *
 * Maltese signs follow the Vienna Convention (Traffic Ordinance, Chapter 65).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=mt
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'mt',
  country: 'Malta',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Malta',
  commonsCategories: ['SVG_road_signs_in_Malta', 'Road_signs_in_Malta'],
});
