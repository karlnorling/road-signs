/**
 * scrape-rs.ts — Serbia
 *
 * Serbian signs follow the Vienna Convention (Zakon o bezbednosti saobraćaja na putevima).
 * Codes: II (warning), III (priority/prohibitory), IV (mandatory), V (information).
 *
 * Run via: yarn update --country=rs
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'rs',
  country: 'Serbia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Serbia',
  headingMapExtra: [
    { pattern: 'danger warning', category: 'warning' },
    { pattern: 'right of way', category: 'priority' },
    { pattern: 'prohibition', category: 'prohibitory' },
    { pattern: 'obligation', category: 'mandatory' },
    { pattern: 'special regulation', category: 'information' },
    { pattern: 'guide', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Serbia'],
});
