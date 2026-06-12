/**
 * scrape-am.ts — Armenia
 * Vienna Convention. Run via: yarn update --country=am
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'am',
  country: 'Armenia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Armenia',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Armenia',
    'SVG_warning_road_signs_of_Armenia',
    'SVG_priority_road_signs_of_Armenia',
    'SVG_prohibitory_road_signs_of_Armenia',
    'SVG_mandatory_road_signs_of_Armenia',
    'SVG_information_road_signs_of_Armenia',
    'SVG_service_road_signs_of_Armenia',
    'SVG_additional_road_signs_of_Armenia',
    'SVG_special_regulation_road_signs_of_Armenia',
    'SVG_regulatory_road_signs_of_Armenia',
  ],
});
