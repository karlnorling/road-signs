/**
 * scrape-sr.ts — Suriname
 *
 * Suriname uses a Dutch-derived sign system (Vienna Convention) inherited
 * from the colonial period — virtually identical to Netherlands road signs.
 * No Suriname-specific SVG diagrams exist on Wikimedia Commons; this package
 * mirrors the Netherlands sign set (same pattern as Monaco→France,
 * San Marino→Italy). Run via: yarn update --country=sr
 */
import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'sr',
  country: 'Suriname',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Netherlands',
  headingMapExtra: [
    { pattern: 'gevaar', category: 'warning' },
    { pattern: 'voorrang', category: 'priority' },
    { pattern: 'verbod', category: 'prohibitory' },
    { pattern: 'gebod', category: 'mandatory' },
    { pattern: 'aanwijzing', category: 'information' },
  ],
  letterSeriesMap: {
    A: 'warning',
    B: 'priority',
    C: 'prohibitory',
    D: 'mandatory',
    E: 'mandatory',
    F: 'information',
    G: 'information',
    H: 'information',
    J: 'warning',
    L: 'information',
  },
  commonsCategories: [
    'SVG_road_signs_in_Suriname',
    'SVG_road_signs_in_the_Netherlands',
    'SVG_warning_road_signs_of_the_Netherlands',
    'SVG_prohibitory_road_signs_of_the_Netherlands',
    'SVG_mandatory_road_signs_of_the_Netherlands',
    'SVG_priority_road_signs_of_the_Netherlands',
    'SVG_additional_road_signs_of_the_Netherlands',
  ],
});
