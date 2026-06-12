/**
 * scrape-sm.ts — San Marino
 * Vienna Convention (Codice della strada) — identical to Italy.
 * San Marino has no country-specific sign variants; this package mirrors the IT
 * sign set (same as Liechtenstein mirrors Switzerland). Run via: yarn update --country=sm
 */
import { createViennaScraper } from './scrape-vienna';
export default createViennaScraper({
  cc: 'sm',
  country: 'San Marino',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Road_signs_in_Italy',
  headingMapExtra: [
    { pattern: 'pericolo', category: 'warning' },
    { pattern: 'precedenza', category: 'priority' },
    { pattern: 'divieto', category: 'prohibitory' },
    { pattern: 'obbligo', category: 'mandatory' },
    { pattern: 'indicazione', category: 'information' },
    { pattern: 'pannello integrativo', category: 'information' },
  ],
  commonsCategories: ['SVG_road_signs_in_San_Marino', 'SVG_road_signs_in_Italy'],
  extractCode: (text: string): string | null => {
    const fig = text.match(/\bfig(?:ura)?\.\s*((?:I{1,3}|IV|V|VI|VII|VIII|IX|X)\.\d+[a-z]?)\b/i);
    if (fig) return fig[1].toUpperCase();
    const roman = text.match(/\b((?:I{1,3}|IV|V|VI|VII|VIII|IX|X)[.-]\d+[a-z]?)\b/);
    if (roman) return roman[1].toUpperCase();
    const letter = text.match(/\b([A-Z]{1,2}\d+(?:[._-]\d+)*[a-z]?)\b/i);
    return letter ? letter[1].toUpperCase() : null;
  },
});
