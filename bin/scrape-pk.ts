/**
 * scrape-pk.ts — Pakistan
 * Vienna Convention-aligned. Left-hand traffic. Run via: yarn update --country=pk
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'pk',
  country: 'Pakistan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Pakistan',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Pakistan',
    'SVG_warning_road_signs_of_Pakistan',
    'SVG_priority_road_signs_of_Pakistan',
    'SVG_prohibitory_road_signs_of_Pakistan',
    'SVG_mandatory_road_signs_of_Pakistan',
    'SVG_regulatory_road_signs_of_Pakistan',
  ],
});
