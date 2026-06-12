/**
 * scrape-mc.ts — Monaco
 * Vienna Convention (Code de la route) — identical to France.
 * Monaco has no country-specific sign variants; this package mirrors the FR
 * sign set (same as Liechtenstein mirrors Switzerland). Run via: yarn update --country=mc
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'mc',
  country: 'Monaco',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_France',
  headingMapExtra: [
    { pattern: 'series a', category: 'warning' },
    { pattern: 'series ab', category: 'priority' },
    { pattern: 'series b', category: 'prohibitory' },
    { pattern: 'series c', category: 'information' },
    { pattern: 'series d', category: 'information' },
    { pattern: 'series e', category: 'information' },
    { pattern: 'panneau de danger', category: 'warning' },
    { pattern: "panneau d'interdiction", category: 'prohibitory' },
    { pattern: "panneau d'indication", category: 'information' },
  ],
  letterSeriesMap: {
    A: 'warning',
    B: 'prohibitory',
    C: 'information',
    D: 'information',
    E: 'information',
  },
  commonsCategories: ['SVG_road_signs_in_Monaco', 'SVG_road_signs_in_France'],
});
