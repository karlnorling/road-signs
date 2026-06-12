/**
 * scrape-kh.ts — Cambodia
 * Vienna Convention signed (not ratified). European + MUTCD hybrid.
 * Run via: yarn update --country=kh
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'kh',
  country: 'Cambodia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Cambodia',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Cambodia',
    'SVG_warning_road_signs_of_Cambodia',
    'SVG_priority_road_signs_of_Cambodia',
    'SVG_prohibitory_road_signs_of_Cambodia',
    'SVG_mandatory_road_signs_of_Cambodia',
    'SVG_regulatory_road_signs_of_Cambodia',
    'SVG_additional_road_signs_of_Cambodia',
  ],
});
