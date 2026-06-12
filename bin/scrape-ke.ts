/**
 * scrape-ke.ts — Kenya
 *
 * British-derived (NTSA). No standalone Wikipedia article — Commons-only mode.
 * Categories: warning, regulatory.
 *
 * Run via: yarn update --country=ke
 */

import { createViennaScraper } from './scrape-vienna';

// No standalone Wikipedia article for Kenyan road signs — using Commons only.
export default createViennaScraper({
  cc: 'ke',
  country: 'Kenya',
  commonsCategories: [
    'SVG_road_signs_in_Kenya',
    'SVG_warning_road_signs_of_Kenya',
    'SVG_priority_road_signs_of_Kenya',
  ],
});
