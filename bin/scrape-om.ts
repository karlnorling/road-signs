/**
 * scrape-om.ts — Oman
 * GCC Manual (UK-influenced). Commons-only. Run via: yarn update --country=om
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'om',
  country: 'Oman',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Oman',
    'SVG_warning_road_signs_of_Oman',
    'SVG_regulatory_road_signs_of_Oman',
    'SVG_information_road_signs_of_Oman',
  ],
});
