/**
 * scrape-tw.ts — Taiwan
 *
 * Taiwanese signs follow the Road Traffic Safety Rules
 * (道路交通標誌標線號誌設置規則). Codes are numeric.
 *
 * Run via: yarn update --country=tw
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'tw',
  country: 'Taiwan',
  // No Wikipedia article exists — using Wikimedia Commons only.
  commonsCategories: ['Road_signs_in_Taiwan', 'SVG_road_signs_in_Taiwan'],
});
