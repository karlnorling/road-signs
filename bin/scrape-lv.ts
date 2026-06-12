/**
 * scrape-lv.ts — Latvia
 *
 * Latvian signs follow the Vienna Convention (Ceļu satiksmes noteikumi).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=lv
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'lv',
  country: 'Latvia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Latvia',
  commonsCategories: ['SVG_road_signs_in_Latvia'],
});
