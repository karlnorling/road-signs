/**
 * scrape-gt.ts — Guatemala
 * MUTCD-based (SICA/Central American standard). Run via: yarn update --country=gt
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'gt',
  country: 'Guatemala',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Central_America',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'temporary', category: 'warning' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Guatemala',
    'SVG_warning_road_signs_of_Guatemala',
    'SVG_regulatory_road_signs_of_Guatemala',
    'SVG_temporary_road_signs_of_Guatemala',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
});
