/**
 * scrape-md.ts — Moldova
 * Vienna Convention. Run via: yarn update --country=md
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'md',
  country: 'Moldova',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Moldova',
  headingMapExtra: [
    { pattern: 'service', category: 'information' },
    { pattern: 'tourist', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Moldova',
    'SVG_warning_road_signs_of_Moldova',
    'SVG_priority_road_signs_of_Moldova',
    'SVG_prohibitory_road_signs_of_Moldova',
    'SVG_mandatory_road_signs_of_Moldova',
    'SVG_information_road_signs_of_Moldova',
    'SVG_service_road_signs_of_Moldova',
    'SVG_tourist_road_signs_of_Moldova',
    'SVG_additional_road_signs_of_Moldova',
    'SVG_diagrams_of_route_signs_of_Moldova',
  ],
});
