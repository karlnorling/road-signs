/**
 * scrape-ug.ts — Uganda
 * British-derived (Traffic and Road Safety Act). Run via: yarn update --country=ug
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ug',
  country: 'Uganda',
  commonsCategories: [
    'SVG_road_signs_in_Uganda',
    'SVG_warning_road_signs_of_Uganda',
    'SVG_regulatory_road_signs_of_Uganda',
  ],
});
