/**
 * scrape-tt.ts — Trinidad and Tobago
 * British-derived (Motor Vehicles and Road Traffic Act). Run via: yarn update --country=tt
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'tt',
  country: 'Trinidad and Tobago',
  commonsCategories: [
    'SVG_road_signs_in_Trinidad_and_Tobago',
    'SVG_warning_road_signs_of_Trinidad_and_Tobago',
    'SVG_regulatory_road_signs_of_Trinidad_and_Tobago',
  ],
});
