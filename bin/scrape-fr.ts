/**
 * scrape-fr.ts — France
 *
 * French signs use letter+number codes: A1a, AB1, B14, C1b, CE10, EB10 etc.
 * Wikipedia organises them by series (A=danger, AB=priority, B=regulatory,
 * C=indication, CE/D=direction, E=service).
 *
 * Run via: yarn update --country=fr
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'fr',
  country: 'France',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_France',
  headingMapExtra: [
    // French series letter headings that appear in the English Wikipedia article.
    { pattern: 'series a', category: 'warning' },
    { pattern: 'series ab', category: 'priority' },
    { pattern: 'series b', category: 'prohibitory' },
    { pattern: 'series c', category: 'information' },
    { pattern: 'series d', category: 'information' },
    { pattern: 'series e', category: 'information' },
    { pattern: 'panneau de danger', category: 'warning' },
    { pattern: 'panneau de priorité', category: 'priority' },
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
  commonsCategories: ['SVG_road_signs_in_France'],
});
