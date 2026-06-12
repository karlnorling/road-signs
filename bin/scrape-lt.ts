/**
 * scrape-lt.ts — Lithuania
 *
 * Lithuanian signs follow the Vienna Convention (Kelių eismo taisyklės).
 * Codes: A (warning), B (priority), C (prohibitory), D (mandatory), E/F (information).
 *
 * Run via: yarn update --country=lt
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'lt',
  country: 'Lithuania',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Lithuania',
  commonsCategories: ['SVG_road_signs_in_Lithuania'],
});
