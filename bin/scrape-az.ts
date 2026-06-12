/**
 * scrape-az.ts — Azerbaijan
 * Vienna Convention. Run via: yarn update --country=az
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'az',
  country: 'Azerbaijan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Azerbaijan',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Azerbaijan',
    'SVG_warning_road_signs_of_Azerbaijan',
    'SVG_prohibitory_road_signs_of_Azerbaijan',
    'SVG_information_road_signs_of_Azerbaijan',
    'SVG_service_road_signs_of_Azerbaijan',
    'SVG_additional_road_signs_of_Azerbaijan',
    'SVG_regulatory_road_signs_of_Azerbaijan',
    'SVG_diagrams_of_route_signs_of_Azerbaijan',
  ],
});
