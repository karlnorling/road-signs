/**
 * scrape-ni.ts — Nicaragua
 * SIECA. Run via: yarn update --country=ni
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'ni',
  country: 'Nicaragua',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Nicaragua',
  headingMapExtra: [
    { pattern: 'preventiva', category: 'warning' },
    { pattern: 'reglamentaria', category: 'prohibitory' },
    { pattern: 'informativa', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Nicaragua',
    'SVG_warning_road_signs_of_Nicaragua',
    'SVG_regulatory_road_signs_of_Nicaragua',
    'SVG_road_signs_in_the_Central_American_Integration_System',
  ],
});
