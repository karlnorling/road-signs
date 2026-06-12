/**
 * scrape-bd.ts — Bangladesh
 * Vienna Convention-aligned. Left-hand traffic. Run via: yarn update --country=bd
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'bd',
  country: 'Bangladesh',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Bangladesh',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Bangladesh',
    'SVG_warning_road_signs_of_Bangladesh',
    'SVG_priority_road_signs_of_Bangladesh',
    'SVG_prohibitory_road_signs_of_Bangladesh',
    'SVG_mandatory_road_signs_of_Bangladesh',
    'SVG_information_road_signs_in_Bangladesh',
    'SVG_regulatory_road_signs_of_Bangladesh',
    'SVG_additional_road_signs_of_Bangladesh',
  ],
});
