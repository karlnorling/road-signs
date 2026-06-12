/**
 * scrape-na.ts — Namibia
 * South African-derived (Road Traffic and Transport Act). Run via: yarn update --country=na
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'na',
  country: 'Namibia',
  commonsCategories: [
    'SVG_road_signs_in_Namibia',
    'SVG_warning_road_signs_of_Namibia',
    'SVG_regulatory_road_signs_of_Namibia',
  ],
});
