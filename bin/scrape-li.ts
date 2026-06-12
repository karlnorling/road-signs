/**
 * scrape-li.ts — Liechtenstein
 *
 * Liechtenstein uses the same signs as Switzerland (SSV/SVV).
 * Codes use Swiss decimal format: 1.xx (warning), 2.xx (priority),
 * 3.xx (prohibitory), 4.xx (mandatory), 5–6.xx (information).
 *
 * Run via: yarn update --country=li
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'li',
  country: 'Liechtenstein',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Liechtenstein',
  commonsCategories: ['SVG_road_signs_in_Liechtenstein', 'SVG_road_signs_in_Switzerland'],
});
