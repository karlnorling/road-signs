/**
 * scrape-si.ts — Slovenia
 *
 * Slovenian signs follow the Vienna Convention (Pravilnik o prometni signalizaciji).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=si
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'si',
  country: 'Slovenia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Slovenia',
  commonsCategories: ['SVG_road_signs_in_Slovenia'],
});
