/**
 * scrape-hn.ts — Honduras
 * MUTCD-based (SICA/Central American standard). Run via: yarn update --country=hn
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'hn',
  country: 'Honduras',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Central_America',
  headingMapExtra: [
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'temporary', category: 'warning' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Honduras',
    'SVG_warning_road_signs_of_Honduras',
    'SVG_regulatory_road_signs_of_Honduras',
    'SVG_temporary_road_signs_of_Honduras',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
});
