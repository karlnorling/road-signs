/**
 * scrape-cu.ts — Cuba
 * Vienna Convention variant. Run via: yarn update --country=cu
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'cu',
  country: 'Cuba',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Cuba',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Cuba',
    'SVG_warning_road_signs_of_Cuba',
    'SVG_regulatory_road_signs_of_Cuba',
  ],
});
