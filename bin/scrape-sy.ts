/**
 * scrape-sy.ts — Syria
 * Vienna Convention, bilingual Arabic/English. Run via: yarn update --country=sy
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'sy',
  country: 'Syria',
  commonsCategories: [
    'SVG_road_signs_in_Syria',
    'SVG_warning_road_signs_of_Syria',
    'SVG_regulatory_road_signs_of_Syria',
  ],
});
