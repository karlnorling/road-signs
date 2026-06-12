/**
 * scrape-eg.ts — Egypt
 *
 * British-derived (ETSM). No standalone Wikipedia article — Commons-only mode.
 * Categories: warning, priority, prohibitory, mandatory.
 *
 * Run via: yarn update --country=eg
 */

import { createViennaScraper } from './scrape-vienna';

// No standalone Wikipedia article for Egyptian road signs — using Commons only.
export default createViennaScraper({
  cc: 'eg',
  country: 'Egypt',
  commonsCategories: [
    'SVG_road_signs_in_Egypt',
    'SVG_warning_road_signs_of_Egypt',
    'SVG_priority_road_signs_of_Egypt',
    'SVG_prohibitory_road_signs_of_Egypt',
    'SVG_mandatory_road_signs_of_Egypt',
    'SVG_regulatory_road_signs_of_Egypt',
  ],
});
