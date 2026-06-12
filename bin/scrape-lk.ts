/**
 * scrape-lk.ts — Sri Lanka
 * Vienna Convention (Motor Traffic Act). Left-hand traffic.
 * Run via: yarn update --country=lk
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'lk',
  country: 'Sri Lanka',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Sri_Lanka',
  headingMapExtra: [{ pattern: 'regulatory', category: 'prohibitory' }],
  commonsCategories: [
    'SVG_road_signs_in_Sri_Lanka',
    'SVG_warning_road_signs_of_Sri_Lanka',
    'SVG_priority_road_signs_of_Sri_Lanka',
    'SVG_prohibitory_road_signs_of_Sri_Lanka',
    'SVG_regulatory_road_signs_of_Sri_Lanka',
    'SVG_additional_road_signs_of_Sri_Lanka',
  ],
});
