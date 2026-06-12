/**
 * scrape-zw.ts — Zimbabwe
 * British-derived, left-hand traffic. Run via: yarn update --country=zw
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'zw',
  country: 'Zimbabwe',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Zimbabwe',
  headingMapExtra: [
    { pattern: 'cautionary', category: 'warning' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'informatory', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Zimbabwe',
    'SVG_warning_road_signs_of_Zimbabwe',
    'SVG_regulatory_road_signs_of_Zimbabwe',
  ],
});
