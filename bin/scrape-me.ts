/**
 * scrape-me.ts — Montenegro
 *
 * Montenegrin signs follow the Vienna Convention (Zakon o bezbjednosti saobraćaja na putevima).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=me
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'me',
  country: 'Montenegro',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Montenegro',
  commonsCategories: ['SVG_road_signs_in_Montenegro'],
});
