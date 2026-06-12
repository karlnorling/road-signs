/**
 * scrape-au.ts — Australia
 *
 * Australian signs follow AS1742 (Manual of Uniform Traffic Control Devices).
 * Sign codes vary by state but national standards use W (warning), R (regulatory),
 * and information/direction signs with alphanumeric codes.
 *
 * Run via: yarn update --country=au
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'au',
  country: 'Australia',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Australia',
  headingMapExtra: [
    { pattern: 'warning', category: 'warning' },
    { pattern: 'regulatory', category: 'prohibitory' },
    { pattern: 'give way', category: 'priority' },
    { pattern: 'stop sign', category: 'priority' },
    { pattern: 'keep left', category: 'mandatory' },
    { pattern: 'speed limit', category: 'prohibitory' },
    { pattern: 'no entry', category: 'prohibitory' },
    { pattern: 'motorway', category: 'information' },
    { pattern: 'tourist', category: 'information' },
    { pattern: 'temporary', category: 'information' },
    { pattern: 'construction', category: 'information' },
    { pattern: 'work zone', category: 'information' },
  ],
  commonsCategories: ['Road_signs_in_Australia', 'SVG_road_signs_in_Australia'],
  // Australian codes: W1-1, R1-1, G1, M1 (US MUTCD-influenced)
  extractCode: (text: string): string | null => {
    const m = text.match(/\b([A-Z][1-9]\d*(?:-\d+[a-z]?)?)\b/i);
    if (m && /\d/.test(m[1])) return m[1].toUpperCase();
    return null;
  },
});
