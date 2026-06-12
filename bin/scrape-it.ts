/**
 * scrape-it.ts — Italy
 *
 * Italian signs are identified by figure numbers ("fig. II.1", "fig. III.5")
 * from the Codice della Strada. Wikipedia galleries use these in captions.
 * Wikimedia Commons filenames often use the full figure reference.
 *
 * Run via: yarn update --country=it
 */

import { createViennaScraper } from './scrape-vienna';

export default createViennaScraper({
  cc: 'it',
  country: 'Italy',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Italy',
  headingMapExtra: [
    { pattern: 'pericolo', category: 'warning' },
    { pattern: 'precedenza', category: 'priority' },
    { pattern: 'divieto', category: 'prohibitory' },
    { pattern: 'obbligo', category: 'mandatory' },
    { pattern: 'indicazione', category: 'information' },
    { pattern: 'pannello integrativo', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_Italy'],
  // Italian codes: "fig. II.1", "fig. III.5", or plain "II-1"
  // Also match standard letter+number where present.
  extractCode: (text: string): string | null => {
    const fig = text.match(/\bfig(?:ura)?\.\s*((?:I{1,3}|IV|V|VI|VII|VIII|IX|X)\.\d+[a-z]?)\b/i);
    if (fig) return fig[1].toUpperCase();
    // Plain Roman numeral + number: "II.1", "III-5"
    const roman = text.match(/\b((?:I{1,3}|IV|V|VI|VII|VIII|IX|X)[.-]\d+[a-z]?)\b/);
    if (roman) return roman[1].toUpperCase();
    // Standard Vienna letter+number fallback.
    const letter = text.match(/\b([A-Z]{1,2}\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return letter ? letter[1].toUpperCase() : null;
  },
});
