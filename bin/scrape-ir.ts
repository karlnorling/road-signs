/**
 * scrape-ir.ts — Iran
 * Vienna Convention adjacent (Road Signs Manual of Iran). Run via: yarn update --country=ir
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ir',
  country: 'Iran',
  commonsCategories: [
    'SVG_road_signs_in_Iran',
    'SVG_warning_road_signs_of_Iran',
    'SVG_regulatory_road_signs_of_Iran',
    'SVG_mandatory_road_signs_of_Iran',
  ],
});
