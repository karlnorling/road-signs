/**
 * scrape-jo.ts — Jordan
 * Vienna Convention. Commons-only (no Wikipedia article). Run via: yarn update --country=jo
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'jo',
  country: 'Jordan',
  commonsCategories: [
    'SVG_road_signs_in_Jordan',
    'SVG_warning_road_signs_in_Jordan',
    'SVG_priority_road_signs_of_Jordan',
    'SVG_prohibitory_road_signs_of_Jordan',
    'SVG_mandatory_road_signs_of_Jordan',
    'SVG_information_road_signs_in_Jordan',
    'SVG_regulatory_road_signs_of_Jordan',
    'SVG_additional_road_signs_of_Jordan',
  ],
});
