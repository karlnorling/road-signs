/**
 * scrape-gy.ts — Guyana
 * British-derived (Motor Vehicles and Road Traffic Act). Run via: yarn update --country=gy
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'gy',
  country: 'Guyana',
  commonsCategories: [
    'SVG_road_signs_in_Guyana',
    'SVG_warning_road_signs_of_Guyana',
    'SVG_regulatory_road_signs_of_Guyana',
  ],
});
