/**
 * scrape-ve.ts — Venezuela
 * MUTCD-based. Commons-only. Run via: yarn update --country=ve
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 've',
  country: 'Venezuela',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'school', category: 'warning' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Venezuela',
    'SVG_warning_road_signs_of_Venezuela',
    'SVG_regulatory_road_signs_of_Venezuela',
    'SVG_school_road_signs_of_Venezuela',
  ],
});
