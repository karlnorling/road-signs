/**
 * scrape-zm.ts — Zambia
 * British-derived (Roads and Road Traffic Act). Run via: yarn update --country=zm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'zm',
  country: 'Zambia',
  commonsCategories: [
    'SVG_road_signs_in_Zambia',
    'SVG_warning_road_signs_of_Zambia',
    'SVG_regulatory_road_signs_of_Zambia',
  ],
});
