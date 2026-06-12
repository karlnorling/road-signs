/**
 * scrape-kw.ts — Kuwait
 * UK-influenced. Commons-only. Run via: yarn update --country=kw
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'kw',
  country: 'Kuwait',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Kuwait',
    'SVG_warning_road_signs_of_Kuwait',
    'SVG_regulatory_road_signs_of_Kuwait',
  ],
});
