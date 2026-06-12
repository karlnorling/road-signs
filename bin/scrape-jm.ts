/**
 * scrape-jm.ts — Jamaica
 * British-derived (Road Traffic Act). Run via: yarn update --country=jm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'jm',
  country: 'Jamaica',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Jamaica',
  headingMapExtra: [
    { pattern: 'parking', category: 'prohibitory' },
    { pattern: 'stopping', category: 'prohibitory' },
    { pattern: 'construction', category: 'warning' },
    { pattern: 'advisory', category: 'information' },
  ],
  letterSeriesMap: {
    R: 'prohibitory',
    W: 'warning',
    C: 'warning',
    F: 'information',
    U: 'information',
    I: 'information',
  },
  commonsCategories: [
    'SVG_road_signs_in_Jamaica',
    'SVG_warning_road_signs_of_Jamaica',
    'SVG_regulatory_road_signs_of_Jamaica',
  ],
});
