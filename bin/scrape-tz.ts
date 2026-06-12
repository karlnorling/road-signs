/**
 * scrape-tz.ts — Tanzania
 * British-derived, left-hand traffic. Run via: yarn update --country=tz
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'tz',
  country: 'Tanzania',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Tanzania',
  headingMapExtra: [
    { pattern: 'cautionary', category: 'warning' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'informatory', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Tanzania',
    'SVG_warning_road_signs_of_Tanzania',
    'SVG_regulatory_road_signs_of_Tanzania',
  ],
});
