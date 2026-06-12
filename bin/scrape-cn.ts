/**
 * scrape-cn.ts — China
 *
 * GB national standard (non-Vienna). Categories: warning, prohibitory,
 * mandatory, indicative/information.
 *
 * Run via: yarn update --country=cn
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'cn',
  country: 'China',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_China',
  headingMapExtra: [
    { pattern: 'indicative', category: 'information' },
    { pattern: 'informational', category: 'information' },
    { pattern: 'tourist', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_China',
    'SVG_warning_road_signs_of_China',
    'SVG_prohibitory_road_signs_of_China',
    'SVG_mandatory_road_signs_of_China',
    'SVG_priority_road_signs_of_China',
    'SVG_information_road_signs_of_China',
    'SVG_additional_road_signs_of_China',
  ],
});
