/**
 * scrape-dz.ts — Algeria
 * Vienna Convention (French-influenced). Commons-only. Run via: yarn update --country=dz
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'dz',
  country: 'Algeria',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Algeria',
    'SVG_warning_road_signs_of_Algeria',
    'SVG_regulatory_road_signs_of_Algeria',
  ],
});
