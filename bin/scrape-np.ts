/**
 * scrape-np.ts — Nepal
 * British-derived, left-hand traffic. Run via: yarn update --country=np
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'np',
  country: 'Nepal',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Nepal',
  headingMapExtra: [
    { pattern: 'cautionary', category: 'warning' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'mandatory', category: 'mandatory' },
    { pattern: 'informatory', category: 'information' },
  ],
  commonsCategories: [
    'SVG_road_signs_in_Nepal',
    'SVG_warning_road_signs_of_Nepal',
    'SVG_prohibitory_road_signs_of_Nepal',
    'SVG_mandatory_road_signs_of_Nepal',
  ],
});
