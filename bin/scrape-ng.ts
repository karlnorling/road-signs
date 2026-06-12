/**
 * scrape-ng.ts — Nigeria
 *
 * British-derived. No standalone Wikipedia article — Commons-only mode.
 * Categories: warning, priority, prohibitory, mandatory, information.
 *
 * Run via: yarn update --country=ng
 */

import { createViennaScraper } from './scrape-vienna';

// No standalone Wikipedia article for Nigerian road signs — using Commons only.
export default createViennaScraper({
  cc: 'ng',
  country: 'Nigeria',
  commonsCategories: [
    'SVG_road_signs_in_Nigeria',
    'SVG_warning_road_signs_of_Nigeria',
    'SVG_priority_road_signs_of_Nigeria',
    'SVG_prohibitory_road_signs_of_Nigeria',
    'SVG_mandatory_road_signs_of_Nigeria',
    'SVG_information_road_signs_of_Nigeria',
  ],
});
