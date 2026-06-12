/**
 * scrape-uz.ts — Uzbekistan
 * Vienna Convention. Run via: yarn update --country=uz
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'uz',
  country: 'Uzbekistan',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Uzbekistan',
  headingMapExtra: [
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'service', category: 'information' },
    { pattern: 'additional', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Uzbekistan',
    'SVG_warning_road_signs_of_Uzbekistan',
    'SVG_priority_road_signs_of_Uzbekistan',
    'SVG_prohibitory_road_signs_of_Uzbekistan',
    'SVG_mandatory_road_signs_of_Uzbekistan',
    'SVG_information_road_signs_of_Uzbekistan',
    'SVG_service_road_signs_of_Uzbekistan',
    'SVG_additional_road_signs_of_Uzbekistan',
  ],
});
