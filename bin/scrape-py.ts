/**
 * scrape-py.ts — Paraguay
 * MUTCD-based. Run via: yarn update --country=py
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'py',
  country: 'Paraguay',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Paraguay',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Paraguay',
    'SVG_warning_road_signs_of_Paraguay',
    'SVG_regulatory_road_signs_of_Paraguay',
    'SVG_information_road_signs_of_Paraguay',
  ],
});
