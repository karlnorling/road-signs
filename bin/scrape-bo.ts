/**
 * scrape-bo.ts — Bolivia
 * MUTCD-based. Commons-only. Run via: yarn update --country=bo
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'bo',
  country: 'Bolivia',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Bolivia',
    'SVG_warning_road_signs_of_Bolivia',
    'SVG_regulatory_road_signs_of_Bolivia',
  ],
});
