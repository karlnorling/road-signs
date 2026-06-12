/**
 * scrape-pa.ts — Panama
 * MUTCD-based. Commons-only. Run via: yarn update --country=pa
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'pa',
  country: 'Panama',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Panama',
    'SVG_warning_road_signs_of_Panama',
    'SVG_regulatory_road_signs_of_Panama',
  ],
});
