/**
 * generate-docs.ts
 *
 * Generates coverage documentation in two places:
 *   1. packages/@road-signs/docs/  — standalone publishable markdown package
 *   2. apps/docs/src/content/docs/countries/{cc}.mdx — injects a ## Coverage
 *      section into each Astro Starlight country page (between marker comments)
 *
 * Usage: yarn generate-docs
 */

import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// ---------------------------------------------------------------------------
// Country metadata
// ---------------------------------------------------------------------------

interface CountryMeta {
  name: string;
  standard: string;
  sources: Array<{ label: string; url: string }>;
  notes?: string;
  /** Which side of the road traffic drives on. */
  driveSide?: 'left' | 'right' | 'mixed';
  /** Official sign language(s), in ISO-name form (e.g. ['English', 'Welsh']). */
  languages?: string[];
  /** Name of the agency or regulation that publishes the sign system. */
  regulator?: string;
  /** Code convention summary (e.g. 'W1-1 / R2-1', 'Zeichen NNN', 'A.1 / B.1'). */
  codePrefix?: string;
}

const COUNTRIES: Record<string, CountryMeta> = {
  al: {
    name: 'Albania',
    standard: 'Kodi Rrugor — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Albania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Albania',
      },
    ],
    driveSide: 'right',
    languages: ['Albanian'],
    regulator: 'Drejtoria e Përgjithshme e Rrugëve',
  },
  ar: {
    name: 'Argentina',
    standard: 'Decreto 779/95 — Reglamento Nacional de Tránsito (Vienna Convention variant)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Argentina',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Argentina',
      },
      {
        label: 'Wikimedia Commons — Road signs in Argentina (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Argentina',
      },
    ],
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'CNRT',
    codePrefix: 'P-1 / R-1 / I-1',
  },
  at: {
    name: 'Austria',
    standard: 'StVO (Straßenverkehrs-Ordnung) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Austria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Austria',
      },
    ],
    driveSide: 'right',
    languages: ['German'],
    regulator: 'BMK (StVO)',
    codePrefix: 'Zeichen NNN',
  },
  au: {
    name: 'Australia',
    standard: 'AS1742 (Manual of Uniform Traffic Control Devices)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Australia',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Australia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Australia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Australia',
      },
    ],
    notes:
      'Sign codes and designs vary by state/territory; national AS1742 standards are used where available.',
    driveSide: 'left',
    languages: ['English'],
    regulator: 'Austroads (AS1742)',
    codePrefix: 'W1-1 / R1-1',
  },
  ba: {
    name: 'Bosnia and Herzegovina',
    standard: 'Zakon o osnovama bezbjednosti saobraćaja na cestama — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Bosnia and Herzegovina',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bosnia_and_Herzegovina',
      },
    ],
    driveSide: 'right',
    languages: ['Bosnian', 'Croatian', 'Serbian'],
    regulator: 'BIHAMK',
  },
  be: {
    name: 'Belgium',
    standard: 'Code de la route / Verkeersreglement — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Belgium',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belgium',
      },
    ],
    driveSide: 'right',
    languages: ['Dutch', 'French', 'German'],
    regulator: 'SPF Mobilité',
    codePrefix: 'A1 / B1 / C1',
  },
  bg: {
    name: 'Bulgaria',
    standard: 'Закон за движението по пътищата (ZDP) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Bulgaria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bulgaria',
      },
    ],
    driveSide: 'right',
    languages: ['Bulgarian'],
    regulator: 'API',
  },
  bn: {
    name: 'Brunei',
    standard: 'Road Traffic Act — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Brunei',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brunei',
      },
    ],
    notes:
      'No Wikipedia road signs article exists. Signs are sourced directly from Wikimedia Commons subcategories (warning, information, prohibitory, mandatory, priority, regulatory).',
    driveSide: 'left',
    languages: ['Malay', 'English'],
    regulator: 'Land Transport Department',
  },
  cl: {
    name: 'Chile',
    standard: 'Manual de Señalización de Tránsito (DGOP/MOP) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Chile',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Chile',
      },
      {
        label: 'Wikimedia Commons — Road signs in Chile (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Chile',
      },
    ],
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'MOP (DGOP)',
    codePrefix: 'PA-1 / RP-1 / IT-1',
  },
  co: {
    name: 'Colombia',
    standard: 'Manual de Señalización Vial (MSV/INVIAS) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Colombia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Colombia',
      },
      {
        label: 'Wikimedia Commons — Road signs in Colombia (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Colombia',
      },
    ],
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'INVIAS (MSV)',
    codePrefix: 'SP-01 / SR-01',
  },
  cr: {
    name: 'Costa Rica',
    standard:
      'Manual Centroamericano de Dispositivos Uniformes para el Control del Tránsito (SIECA) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Costa Rica',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Costa_Rica',
      },
      {
        label: 'Wikimedia Commons — Road signs in Costa Rica',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Costa_Rica',
      },
      {
        label: 'Wikimedia Commons — Road signs in Costa Rica (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Costa_Rica',
      },
    ],
    notes:
      'Follows the Central American SIECA manual. Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa (information).',
  },
  cy: {
    name: 'Cyprus',
    standard: 'Road Traffic Law (Cap. 332) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Cyprus',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cyprus',
      },
    ],
    driveSide: 'left',
    languages: ['Greek', 'Turkish', 'English'],
    regulator: 'Road Transport Department',
  },
  br: {
    name: 'Brazil',
    standard: 'CTB (Código de Trânsito Brasileiro) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Brazil',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Brazil',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Brazil',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Brazil',
      },
    ],
    driveSide: 'right',
    languages: ['Portuguese'],
    regulator: 'CONTRAN (CTB)',
    codePrefix: 'A-1a / R-1 / I-1',
  },
  ca: {
    name: 'Canada',
    standard: 'MUTCDC (Manual of Uniform Traffic Control Devices for Canada)',
    sources: [
      {
        label: 'Wikimedia Commons — Regulatory signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_regulatory_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — Warning signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — School signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_school_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — Temporary signs of Canada',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_temporary_road_signs_of_Canada',
      },
      {
        label: 'Wikimedia Commons — British Columbia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_British_Columbia',
      },
      {
        label: 'Wikimedia Commons — Quebec',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Quebec',
      },
      {
        label: 'Wikimedia Commons — Ontario',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Ontario',
      },
      {
        label: 'Wikimedia Commons — Alberta',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Alberta',
      },
      {
        label: 'Wikimedia Commons — Manitoba',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Manitoba',
      },
      {
        label: 'Wikimedia Commons — Nova Scotia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Nova_Scotia',
      },
      {
        label: 'Wikimedia Commons — New Brunswick',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_New_Brunswick',
      },
      {
        label: 'Wikimedia Commons — Saskatchewan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Saskatchewan',
      },
      {
        label: 'Wikimedia Commons — Prince Edward Island',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Prince_Edward_Island',
      },
      {
        label: 'Wikimedia Commons — Newfoundland and Labrador',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_of_Newfoundland_and_Labrador',
      },
    ],
    driveSide: 'right',
    languages: ['English', 'French'],
    regulator: 'Transport Canada (MUTCDC)',
    codePrefix: 'RA-2 / WA-8 / TC-1',
  },
  ch: {
    name: 'Switzerland',
    standard: 'SVV / SSV (Signalisationsverordnung) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Switzerland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Switzerland',
      },
    ],
    notes:
      'Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5–6.xx (information).',
    driveSide: 'right',
    languages: ['German', 'French', 'Italian', 'Romansh'],
    regulator: 'ASTRA (SSV)',
    codePrefix: '1.01 / 2.02 / 3.03',
  },
  ec: {
    name: 'Ecuador',
    standard: 'INEN (Instituto Ecuatoriano de Normalización) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Ecuador',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Ecuador',
      },
      {
        label: 'Wikimedia Commons — Road signs in Ecuador',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ecuador',
      },
      {
        label: 'Wikimedia Commons — Road signs in Ecuador (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ecuador',
      },
    ],
    notes:
      'Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa (information).',
  },
  de: {
    name: 'Germany',
    standard: 'StVO (Straßenverkehrs-Ordnung) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Germany',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Germany',
      },
      {
        label: 'Wikimedia Commons — Warnschilder (Deutschland)',
        url: 'https://commons.wikimedia.org/wiki/Category:Warnschilder_(Deutschland)',
      },
    ],
    driveSide: 'right',
    languages: ['German'],
    regulator: 'BMVI (StVO)',
    codePrefix: 'Zeichen 101 / 274',
  },
  dk: {
    name: 'Denmark',
    standard: 'Færdselsloven — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Denmark',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Denmark',
      },
      {
        label: 'Wikimedia Commons — Road signs in Denmark (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Denmark',
      },
    ],
    driveSide: 'right',
    languages: ['Danish'],
    regulator: 'Vejdirektoratet',
    codePrefix: 'A11 / B11 / C11',
  },
  ee: {
    name: 'Estonia',
    standard: 'Liiklusseadus — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Estonia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Estonia',
      },
    ],
    driveSide: 'right',
    languages: ['Estonian'],
    regulator: 'Transpordiamet',
  },
  is: {
    name: 'Iceland',
    standard: 'Umferðarlög — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Iceland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iceland',
      },
      {
        label: 'Wikimedia Commons — Road signs in Iceland (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Iceland',
      },
    ],
    driveSide: 'right',
    languages: ['Icelandic'],
    regulator: 'Vegagerðin',
    codePrefix: 'A01 / B01 / C01',
  },
  es: {
    name: 'Spain',
    standard: 'Reglamento General de Circulación — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Spain',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Spain',
      },
    ],
    notes:
      'S-series (additional panel / service) signs are raster-only on Wikimedia; SVG coverage is ~89%.',
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'DGT',
    codePrefix: 'P-1 / R-1 / S-1',
  },
  fi: {
    name: 'Finland',
    standard: 'Tieliikennelaki — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Finland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Finland',
      },
    ],
    notes:
      'Codes are 3-digit numeric: 111–199 (warning), 211–299 (priority), 311–399 (prohibitory), 411–499 (mandatory), 511+ (information).',
    driveSide: 'right',
    languages: ['Finnish', 'Swedish'],
    regulator: 'Traficom',
    codePrefix: '111 / 211 / 311',
  },
  fr: {
    name: 'France',
    standard: 'Code de la route — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in France',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_France',
      },
    ],
    driveSide: 'right',
    languages: ['French'],
    regulator: 'Sécurité Routière',
    codePrefix: 'A1a / B1 / C18',
  },
  cz: {
    name: 'Czech Republic',
    standard: 'Zákon č. 361/2000 Sb. — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in the Czech Republic',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Czech_Republic',
      },
    ],
    driveSide: 'right',
    languages: ['Czech'],
    regulator: 'MD ČR',
    codePrefix: 'A-1 / B-1 / C-1',
  },
  gr: {
    name: 'Greece',
    standard: 'ΚΟΚ (Κώδικας Οδικής Κυκλοφορίας) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Greece',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Greece',
      },
    ],
    notes: 'Codes use romanized ΚΟΚ series: K (warning), R (prohibitory), P (information).',
    driveSide: 'right',
    languages: ['Greek'],
    regulator: 'Greek Ministry of Infrastructure',
    codePrefix: 'K-1 / R-1 / P-1',
  },
  hr: {
    name: 'Croatia',
    standard: 'Pravilnik o prometnim znakovima — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Croatia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Croatia',
      },
    ],
    driveSide: 'right',
    languages: ['Croatian'],
    regulator: 'HAK',
  },
  hu: {
    name: 'Hungary',
    standard: 'KRESZ (Közúti Közlekedési Szabályzat) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Hungary',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Hungary',
      },
    ],
    driveSide: 'right',
    languages: ['Hungarian'],
    regulator: 'NKH (KRESZ)',
  },
  in: {
    name: 'India',
    standard: 'Motor Vehicles Act — IRC:67 standard',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in India',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_India',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in India',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_India',
      },
    ],
    notes:
      'Categories: Cautionary (warning), Mandatory (prohibitory/regulatory), Informatory (information).',
    driveSide: 'left',
    languages: ['Hindi', 'English'],
    regulator: 'IRC:67',
    codePrefix: 'C / M / I',
  },
  ie: {
    name: 'Ireland',
    standard: 'Road Traffic (Signs) Regulations — TSRGD-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Ireland',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Ireland',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Ireland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ireland',
      },
    ],
    driveSide: 'left',
    languages: ['English', 'Irish'],
    regulator: 'RSA (TSM)',
    codePrefix: 'RUS 001 / W 042',
  },
  il: {
    name: 'Israel',
    standard: 'Israeli Traffic Ordinance — Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Israel',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Israel',
      },
      {
        label: 'Wikimedia Commons — Road signs in Israel',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Israel',
      },
      {
        label: 'Wikimedia Commons — Road signs in Israel (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Israel',
      },
    ],
    driveSide: 'right',
    languages: ['Hebrew', 'Arabic'],
    regulator: 'Israel Ministry of Transport',
  },
  it: {
    name: 'Italy',
    standard: 'Codice della strada — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Italy',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Italy',
      },
    ],
    notes:
      'Panel (A/B/P/Q series) and traffic light signs exist only as raster images on Wikipedia.',
    driveSide: 'right',
    languages: ['Italian'],
    regulator: 'MIT (Codice della Strada)',
    codePrefix: 'Fig. II.1 / II.50',
  },
  jp: {
    name: 'Japan',
    standard: 'Road Traffic Law (道路交通法)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Japan',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Japan',
      },
    ],
    notes:
      'Codes are 3-digit numeric: 1xx (regulatory), 2xx (warning), 3xx (instruction), 4xx (guide).',
    driveSide: 'left',
    languages: ['Japanese'],
    regulator: 'National Police Agency',
    codePrefix: '101 / 201 / 301',
  },
  kr: {
    name: 'South Korea',
    standard: 'Road Traffic Act (도로교통법)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in South Korea',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Korea',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in South Korea',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Korea',
      },
    ],
    notes:
      'Codes are numeric: 1xx (regulatory/prohibitory), 2xx (warning), 3xx (instruction), 4xx (guide).',
    driveSide: 'right',
    languages: ['Korean'],
    regulator: 'KNPA',
    codePrefix: '101 / 201 / 301',
  },
  li: {
    name: 'Liechtenstein',
    standard: 'SSV/SVV (Signalisationsverordnung) — same signs as Switzerland',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Liechtenstein',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Liechtenstein',
      },
      {
        label: 'Wikimedia Commons — Road signs in Switzerland (shared)',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Switzerland',
      },
    ],
    notes:
      'Liechtenstein uses identical signs to Switzerland. Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5–6.xx (information).',
    driveSide: 'right',
    languages: ['German'],
    regulator: 'ASTRA (uses Swiss SSV)',
    codePrefix: '1.01 / 2.02',
  },
  lt: {
    name: 'Lithuania',
    standard: 'Kelių eismo taisyklės — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Lithuania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Lithuania',
      },
    ],
    driveSide: 'right',
    languages: ['Lithuanian'],
    regulator: 'LAKD',
  },
  lu: {
    name: 'Luxembourg',
    standard: 'Code de la route — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Luxembourg',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Luxembourg',
      },
    ],
    driveSide: 'right',
    languages: ['French', 'German', 'Luxembourgish'],
    regulator: 'MMTP',
  },
  lv: {
    name: 'Latvia',
    standard: 'Ceļu satiksmes noteikumi — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Latvia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Latvia',
      },
    ],
    driveSide: 'right',
    languages: ['Latvian'],
    regulator: 'CSDD',
  },
  ma: {
    name: 'Morocco',
    standard: 'Code de la route (Dahir 1-10-07) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Morocco',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Morocco',
      },
      {
        label: 'Wikimedia Commons — Road signs in Morocco (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Morocco',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'French'],
    regulator: 'Ministry of Equipment',
  },
  me: {
    name: 'Montenegro',
    standard: 'Zakon o bezbjednosti saobraćaja na putevima — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Montenegro',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Montenegro',
      },
    ],
    driveSide: 'right',
    languages: ['Montenegrin'],
    regulator: 'Auto-moto savez Crne Gore',
  },
  mg: {
    name: 'Madagascar',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Madagascar uses the SADC regional sign standard. No Madagascar-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
    driveSide: 'right',
    languages: ['Malagasy', 'French'],
    regulator: 'ATT',
  },
  my: {
    name: 'Malaysia',
    standard: 'Road Transport (Traffic Signs) Rules 1959 — Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Malaysia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Malaysia',
      },
      {
        label: 'Wikimedia Commons — Road signs in Malaysia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Malaysia',
      },
      {
        label: 'Wikimedia Commons — Road signs in Malaysia (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Malaysia',
      },
    ],
    driveSide: 'left',
    languages: ['Malay'],
    regulator: 'JKR',
  },
  mk: {
    name: 'North Macedonia',
    standard: 'Закон за безбедност на сообраќајот на патиштата — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in North Macedonia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Macedonia',
      },
    ],
    driveSide: 'right',
    languages: ['Macedonian'],
    regulator: 'AMSM',
  },
  mt: {
    name: 'Malta',
    standard: 'Traffic Ordinance (Chapter 65) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Malta',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Malta',
      },
      {
        label: 'Wikimedia Commons — Road signs in Malta (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Malta',
      },
    ],
    driveSide: 'left',
    languages: ['Maltese', 'English'],
    regulator: 'Transport Malta',
  },
  mu: {
    name: 'Mauritius',
    standard: 'Traffic Signs Regulations 1990 — UK-derived system',
    sources: [
      {
        label: 'Wikipedia — Road signs in Mauritius',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Mauritius',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Mauritius',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mauritius',
      },
    ],
    notes:
      'Mauritius uses a UK-derived system (Traffic Signs Regulations 1990) rather than the SADC regional standard used by most neighbouring countries.',
    driveSide: 'left',
    languages: ['English', 'French'],
    regulator: 'Traffic Management Road Safety Unit',
  },
  mx: {
    name: 'Mexico',
    standard: 'SCT (Secretaría de Comunicaciones y Transportes) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Mexico',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mexico',
      },
      {
        label: 'Wikimedia Commons — Road signs in Mexico (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Mexico',
      },
    ],
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'SCT',
    codePrefix: 'SR-1 / SP-1 / SI-1',
  },
  nl: {
    name: 'Netherlands',
    standard: 'RVV 1990 (Reglement Verkeersregels en Verkeerstekens) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in the Netherlands',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands',
      },
    ],
    notes:
      'Several series (J, B, E, G, H, L, K) are raster-only on Wikimedia; SVG coverage is ~67%.',
    driveSide: 'right',
    languages: ['Dutch'],
    regulator: 'CROW (RVV 1990)',
    codePrefix: 'A1 / B1 / C1 / J1',
  },
  no: {
    name: 'Norway',
    standard: 'Skiltforskriften — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Norway',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Norway',
      },
    ],
    notes:
      'Codes are numeric: 1xx (warning), 2xx (priority), 3xx (prohibitory), 4xx (mandatory), 5–7xx (information).',
    driveSide: 'right',
    languages: ['Norwegian'],
    regulator: 'Statens vegvesen',
    codePrefix: '100 / 202 / 306',
  },
  nz: {
    name: 'New Zealand',
    standard: 'Traffic Control Devices Rule (NZTA)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in New Zealand',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_New_Zealand',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in New Zealand',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_New_Zealand',
      },
    ],
    driveSide: 'left',
    languages: ['English', 'Māori'],
    regulator: 'NZTA (TCD Rule)',
  },
  pe: {
    name: 'Peru',
    standard:
      'Manual de Dispositivos de Control del Tránsito Automotor (MTC) — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Peru',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Peru',
      },
      {
        label: 'Wikimedia Commons — Road signs in Peru',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Peru',
      },
      {
        label: 'Wikimedia Commons — Road signs in Peru (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Peru',
      },
    ],
    notes:
      'Headings: Preventiva (warning), Reglamentaria (prohibitory), Informativa/Indicativa (information).',
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'MTC',
    codePrefix: 'P-1A / R-1 / I-1',
  },
  pl: {
    name: 'Poland',
    standard: 'Prawo o ruchu drogowym — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Poland',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Poland',
      },
    ],
    notes: 'Several code series (A–W) scraped from Wikipedia lack matching SVG assets on Commons.',
    driveSide: 'right',
    languages: ['Polish'],
    regulator: 'GDDKiA',
    codePrefix: 'A-1 / B-1 / C-1 / D-1',
  },
  pt: {
    name: 'Portugal',
    standard: 'Código da Estrada — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Portugal',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Portugal',
      },
    ],
    driveSide: 'right',
    languages: ['Portuguese'],
    regulator: 'ANSR (Código da Estrada)',
    codePrefix: 'A-1 / B-1 / C-1',
  },
  ro: {
    name: 'Romania',
    standard: 'Codul rutier (OUG 195/2002) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Romania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Romania',
      },
    ],
    driveSide: 'right',
    languages: ['Romanian'],
    regulator: 'IGPR',
  },
  rs: {
    name: 'Serbia',
    standard: 'Zakon o bezbednosti saobraćaja na putevima — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Serbia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Serbia',
      },
    ],
    driveSide: 'right',
    languages: ['Serbian'],
    regulator: 'AMSS',
  },
  se: {
    name: 'Sweden',
    standard: 'Vägmärkesförordning (VMF) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Sweden',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sweden',
      },
      {
        label: 'Wikimedia Commons — Road signs in Sweden (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Sweden',
      },
    ],
    driveSide: 'right',
    languages: ['Swedish'],
    regulator: 'Trafikverket (VMF)',
    codePrefix: 'A1 / B1 / C1 / D1',
  },
  sg: {
    name: 'Singapore',
    standard: 'Road Traffic Act (Traffic Signs) Rules — Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Singapore',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Singapore',
      },
      {
        label: 'Wikimedia Commons — Road signs in Singapore',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Singapore',
      },
      {
        label: 'Wikimedia Commons — Road signs in Singapore (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Singapore',
      },
    ],
    driveSide: 'left',
    languages: ['English'],
    regulator: 'LTA',
  },
  si: {
    name: 'Slovenia',
    standard: 'Pravilnik o prometni signalizaciji — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Slovenia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovenia',
      },
    ],
    driveSide: 'right',
    languages: ['Slovenian'],
    regulator: 'DRSI',
  },
  sk: {
    name: 'Slovakia',
    standard: 'Zákon č. 8/2009 Z. z. — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Slovakia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Slovakia',
      },
    ],
    driveSide: 'right',
    languages: ['Slovak'],
    regulator: 'MDV SR',
    codePrefix: 'A-1 / B-1 / C-1',
  },
  uk: {
    name: 'United Kingdom',
    standard: 'TSRGD (Traffic Signs Regulations and General Directions)',
    sources: [
      {
        label: 'Wikimedia Commons — Warning signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Warning_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Regulatory signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Regulatory_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Information signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Information_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Direction signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Direction_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Road works signs of the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_works_signs_of_the_United_Kingdom',
      },
      {
        label: 'Wikimedia Commons — Road signs in the UK',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Kingdom',
      },
    ],
    notes:
      'Variable-message motorway signs (direction/temporary categories) are raster-only on Wikimedia.',
    driveSide: 'left',
    languages: ['English', 'Welsh'],
    regulator: 'DfT (TSRGD 2016)',
    codePrefix: 'Diagram 503 / 670 / 7001',
  },
  th: {
    name: 'Thailand',
    standard: 'Land Traffic Act (พระราชบัญญัติจราจรทางบก)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Thailand',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Thailand',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Thailand',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Thailand',
      },
    ],
    driveSide: 'left',
    languages: ['Thai'],
    regulator: 'DOH',
  },
  tr: {
    name: 'Turkey',
    standard: 'Karayolları Trafik Yönetmeliği — Vienna Convention variant',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Turkey',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Turkey',
      },
      {
        label: 'Wikimedia Commons — Road signs in Turkey (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Turkey',
      },
    ],
    driveSide: 'right',
    languages: ['Turkish'],
    regulator: 'KGM',
  },
  tw: {
    name: 'Taiwan',
    standard: 'Road Traffic Safety Rules (道路交通標誌標線號誌設置規則)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Taiwan',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Taiwan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Taiwan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Taiwan',
      },
    ],
    driveSide: 'right',
    languages: ['Mandarin'],
    regulator: 'MOTC Taiwan',
  },
  ua: {
    name: 'Ukraine',
    standard: 'Правила дорожнього руху (PDR) — Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Ukraine',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ukraine',
      },
    ],
    notes:
      'Codes use decimal format: 1.xx (warning), 2.xx (priority), 3.xx (prohibitory), 4.xx (mandatory), 5.xx (information).',
    driveSide: 'right',
    languages: ['Ukrainian'],
    regulator: 'Ukravtodor',
    codePrefix: '1.1 / 2.1 / 3.1',
  },
  us: {
    name: 'United States',
    standard: 'MUTCD (Manual on Uniform Traffic Control Devices) — FHWA',
    sources: [
      {
        label: 'FHWA MUTCD Standard Highway Signs (ZIP)',
        url: 'https://mutcd.fhwa.dot.gov/ser-shs_millennium.htm',
      },
      {
        label: 'Wikimedia Commons — MUTCD signs',
        url: 'https://commons.wikimedia.org/wiki/Category:MUTCD',
      },
      {
        label: 'Wikipedia — Manual on Uniform Traffic Control Devices',
        url: 'https://en.wikipedia.org/wiki/Manual_on_Uniform_Traffic_Control_Devices',
      },
    ],
    notes:
      'Informational (M/I series) signs have ~59% SVG coverage — remaining signs exist only in FHWA PDFs.',
    driveSide: 'right',
    languages: ['English'],
    regulator: 'FHWA',
    codePrefix: 'W1-1 / R2-1 / D5-1 / M1-1',
  },
  uy: {
    name: 'Uruguay',
    standard: 'Decreto 374/004 — Reglamento Nacional de Tránsito (Vienna Convention variant)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Uruguay',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uruguay',
      },
      {
        label: 'Wikimedia Commons — Road signs in Uruguay (general)',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Uruguay',
      },
    ],
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'Dirección Nacional de Tránsito',
    codePrefix: 'P-1 / R-1',
  },
  za: {
    name: 'South Africa',
    standard: 'SARTSM (South African Road Traffic Signs Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in South Africa',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_South_Africa',
      },
      {
        label: 'Wikimedia Commons — Road signs in South Africa',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_South_Africa',
      },
    ],
    driveSide: 'left',
    languages: ['English', 'Afrikaans'],
    regulator: 'SARTSM',
  },
  // New countries
  ae: {
    name: 'United Arab Emirates',
    standard: 'British-derived, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikipedia — Road signs in the UAE',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_United_Arab_Emirates',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the UAE',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_United_Arab_Emirates',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'RTA',
  },
  by: {
    name: 'Belarus',
    standard: 'Vienna Convention (STB 1140-2013)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Belarus',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Belarus',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Belarus',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belarus',
      },
    ],
    driveSide: 'right',
    languages: ['Belarusian', 'Russian'],
    regulator: 'Belarusian State Auto Inspection',
  },
  cn: {
    name: 'China',
    standard: 'GB 5768 national standard (non-Vienna)',
    sources: [
      {
        label: 'Wikipedia — Road signs in China',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_China',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in China',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_China',
      },
    ],
    driveSide: 'right',
    languages: ['Chinese'],
    regulator: 'MPS (GB 5768)',
  },
  eg: {
    name: 'Egypt',
    standard: 'British-derived (Egypt Traffic Signs Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Egypt',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Egypt',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Transport',
  },
  ge: {
    name: 'Georgia',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Georgia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Georgia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Georgia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Georgia_(country)',
      },
    ],
  },
  id: {
    name: 'Indonesia',
    standard: 'Vienna Convention based (Minister of Transport Regulation 2014)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Indonesia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Indonesia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Indonesia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Indonesia',
      },
    ],
    driveSide: 'left',
    languages: ['Indonesian'],
    regulator: 'Ministry of Transportation',
  },
  ke: {
    name: 'Kenya',
    standard: 'British-derived (NTSA Highway Code)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Kenya',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kenya',
      },
    ],
    driveSide: 'left',
    languages: ['English', 'Swahili'],
    regulator: 'NTSA',
  },
  ng: {
    name: 'Nigeria',
    standard: 'British-derived',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Nigeria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nigeria',
      },
    ],
    driveSide: 'right',
    languages: ['English'],
    regulator: 'FRSC',
  },
  ph: {
    name: 'Philippines',
    standard: 'Vienna Convention (original signatory)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Philippines',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Philippines',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Philippines',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Philippines',
      },
    ],
    driveSide: 'right',
    languages: ['Filipino', 'English'],
    regulator: 'DPWH',
  },
  ru: {
    name: 'Russia',
    standard: 'Vienna Convention (ГОСТ Р 52290)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Russia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Russia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Russia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Russia',
      },
    ],
    driveSide: 'right',
    languages: ['Russian'],
    regulator: 'ГИБДД (GIBDD)',
    codePrefix: '1.1 / 2.1 / 3.1',
  },
  sa: {
    name: 'Saudi Arabia',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikipedia — Road signs in Saudi Arabia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Saudi_Arabia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Saudi Arabia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Saudi_Arabia',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'GDT (GCC Manual)',
  },
  vn: {
    name: 'Vietnam',
    standard: 'Vienna Convention adjacent (Ministry of Transport 2019)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Vietnam',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Vietnam',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Vietnam',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Vietnam',
      },
    ],
    driveSide: 'right',
    languages: ['Vietnamese'],
    regulator: 'Ministry of Transport',
  },
  // Batch 3
  bz: {
    name: 'Belize',
    standard: 'UK-influenced / SIECA (Manual Centroamericano)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Belize',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Belize',
      },
    ],
  },
  cu: {
    name: 'Cuba',
    standard: 'Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Cuba',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Cuba',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Cuba',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cuba',
      },
    ],
  },
  do: {
    name: 'Dominican Republic',
    standard: 'MUTCD-influenced / Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Dominican Republic',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Dominican_Republic',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Dominican Republic',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Dominican_Republic',
      },
    ],
  },
  et: {
    name: 'Ethiopia',
    standard: 'Vienna Convention / British-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Ethiopia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ethiopia',
      },
    ],
    driveSide: 'right',
    languages: ['Amharic'],
    regulator: 'Ministry of Transport',
  },
  gh: {
    name: 'Ghana',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Ghana',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Ghana',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Ghana',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ghana',
      },
    ],
    driveSide: 'right',
    languages: ['English'],
    regulator: 'DVLA Ghana',
  },
  kg: {
    name: 'Kyrgyzstan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Kyrgyzstan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Kyrgyzstan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Kyrgyzstan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kyrgyzstan',
      },
    ],
  },
  la: {
    name: 'Laos',
    standard: 'Vienna Convention (Lao PDR Road Traffic Law)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Laos',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Laos',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Laos',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Laos',
      },
    ],
    driveSide: 'right',
    languages: ['Lao'],
    regulator: 'MPWT',
  },
  mn: {
    name: 'Mongolia',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Mongolia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Mongolia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Mongolia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mongolia',
      },
    ],
  },
  ni: {
    name: 'Nicaragua',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Nicaragua',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Nicaragua',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Nicaragua',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nicaragua',
      },
    ],
  },
  np: {
    name: 'Nepal',
    standard: 'British-derived (Department of Roads)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Nepal',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Nepal',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Nepal',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Nepal',
      },
    ],
    driveSide: 'left',
    languages: ['Nepali'],
    regulator: 'DoTM',
  },
  sv: {
    name: 'El Salvador',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in El Salvador',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_El_Salvador',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in El Salvador',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_El_Salvador',
      },
    ],
  },
  tj: {
    name: 'Tajikistan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Tajikistan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Tajikistan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Tajikistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tajikistan',
      },
    ],
  },
  tm: {
    name: 'Turkmenistan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Turkmenistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Turkmenistan',
      },
    ],
  },
  tz: {
    name: 'Tanzania',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Tanzania',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Tanzania',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Tanzania',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tanzania',
      },
    ],
    driveSide: 'left',
    languages: ['Swahili', 'English'],
    regulator: 'SUMATRA',
  },
  uz: {
    name: 'Uzbekistan',
    standard: 'Vienna Convention (ГОСТ Р 52290)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Uzbekistan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Uzbekistan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Uzbekistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uzbekistan',
      },
    ],
  },
  zw: {
    name: 'Zimbabwe',
    standard: 'British-derived (Road Traffic Act, left-hand traffic)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Zimbabwe',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Zimbabwe',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Zimbabwe',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Zimbabwe',
      },
    ],
    driveSide: 'left',
    languages: ['English'],
    regulator: 'Traffic Safety Council',
  },
  // Batch 2
  am: {
    name: 'Armenia',
    standard: 'Vienna Convention (ՀՀ ճանապարհային նշաններ)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Armenia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Armenia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Armenia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Armenia',
      },
    ],
  },
  az: {
    name: 'Azerbaijan',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Azerbaijan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Azerbaijan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Azerbaijan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Azerbaijan',
      },
    ],
  },
  bd: {
    name: 'Bangladesh',
    standard: 'Vienna Convention (UK-influenced)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Bangladesh',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Bangladesh',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Bangladesh',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bangladesh',
      },
    ],
    driveSide: 'left',
    languages: ['Bengali', 'English'],
    regulator: 'BRTA',
  },
  bo: {
    name: 'Bolivia',
    standard: 'Manual de Señalización Vial (SIECA-based)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Bolivia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Bolivia',
      },
    ],
  },
  dz: {
    name: 'Algeria',
    standard: 'Code de la route — Vienna Convention / French-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Algeria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Algeria',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Transport',
  },
  gt: {
    name: 'Guatemala',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Central America',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Central_America',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Guatemala',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Guatemala',
      },
    ],
  },
  hn: {
    name: 'Honduras',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Central America',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Central_America',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Honduras',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Honduras',
      },
    ],
  },
  jo: {
    name: 'Jordan',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Jordan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Jordan',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'Ministry of Public Works',
  },
  kh: {
    name: 'Cambodia',
    standard: 'Vienna Convention (Prakas on Road Signs 2014)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Cambodia',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Cambodia',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Cambodia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cambodia',
      },
    ],
    driveSide: 'right',
    languages: ['Khmer'],
    regulator: 'MPWT',
  },
  kw: {
    name: 'Kuwait',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Kuwait',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kuwait',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'GCC Manual',
  },
  kz: {
    name: 'Kazakhstan',
    standard: 'Vienna Convention (ГОСТ РК 1.1)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Kazakhstan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Kazakhstan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Kazakhstan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Kazakhstan',
      },
    ],
  },
  lb: {
    name: 'Lebanon',
    standard: 'Vienna Convention / French-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Lebanon',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Lebanon',
      },
    ],
    notes: 'Very limited SVG coverage on Wikimedia Commons for Lebanon.',
    driveSide: 'right',
    languages: ['Arabic', 'French'],
    regulator: 'Ministry of Public Works',
  },
  lk: {
    name: 'Sri Lanka',
    standard: 'British-derived (Motor Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Sri Lanka',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Sri_Lanka',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Sri Lanka',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Sri_Lanka',
      },
    ],
    driveSide: 'left',
    languages: ['Sinhala', 'Tamil', 'English'],
    regulator: 'RDA',
  },
  ly: {
    name: 'Libya',
    standard: 'Vienna Convention / Italian-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Libya',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Libya',
      },
    ],
    notes: 'Limited SVG coverage on Wikimedia Commons for Libya.',
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Transport',
  },
  md: {
    name: 'Moldova',
    standard: 'Vienna Convention',
    sources: [
      {
        label: 'Wikipedia — Road signs in Moldova',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Moldova',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Moldova',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Moldova',
      },
    ],
  },
  mm: {
    name: 'Myanmar',
    standard: 'Vienna Convention / UK-influenced',
    sources: [
      {
        label: 'Wikipedia — Road signs in Myanmar',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Myanmar',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Myanmar',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_warning_road_signs_of_Myanmar',
      },
    ],
    notes: 'Limited SVG coverage on Wikimedia Commons for Myanmar.',
    driveSide: 'right',
    languages: ['Burmese'],
    regulator: 'Ministry of Construction',
  },
  om: {
    name: 'Oman',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Oman',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Oman',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'ROP (GCC Manual)',
  },
  pa: {
    name: 'Panama',
    standard: 'Manual Centroamericano de Dispositivos Uniformes (SIECA)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Panama',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Panama',
      },
    ],
  },
  pk: {
    name: 'Pakistan',
    standard: 'British-derived (National Highway Authority)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Pakistan',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Pakistan',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Pakistan',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Pakistan',
      },
    ],
    driveSide: 'left',
    languages: ['Urdu', 'English'],
    regulator: 'NHA',
  },
  py: {
    name: 'Paraguay',
    standard: 'Manual de Señalización Vial — Vienna Convention variant',
    sources: [
      {
        label: 'Wikipedia — Road signs in Paraguay',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Paraguay',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Paraguay',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Paraguay',
      },
    ],
  },
  qa: {
    name: 'Qatar',
    standard: 'Vienna Convention, bilingual Arabic/English (GCC Manual)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Qatar',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Qatar',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Qatar',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Qatar',
      },
    ],
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'Ashghal (GCC Manual)',
  },
  tn: {
    name: 'Tunisia',
    standard: 'Code de la route — Vienna Convention / French-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Tunisia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Tunisia',
      },
    ],
    notes: 'Limited SVG coverage on Wikimedia Commons for Tunisia.',
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Transport',
  },
  ve: {
    name: 'Venezuela',
    standard: 'Manual Venezolano de Dispositivos Uniformes (MVDU)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Venezuela',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Venezuela',
      },
    ],
    driveSide: 'right',
    languages: ['Spanish'],
    regulator: 'INTT',
  },
  // Batch 4
  ad: {
    name: 'Andorra',
    standard: 'Vienna Convention (Code de la circulation)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Andorra',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Andorra',
      },
    ],
  },
  bw: {
    name: 'Botswana',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Botswana',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Botswana',
      },
    ],
    driveSide: 'left',
    languages: ['English', 'Setswana'],
    regulator: 'Department of Road Transport',
  },
  ci: {
    name: "Côte d'Ivoire",
    standard: 'Vienna Convention / French-influenced',
    sources: [
      {
        label: "Wikimedia Commons — SVG road signs in Côte d'Ivoire",
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Ivory_Coast',
      },
      {
        label: 'AGEROUTE — Agence de Gestion des Routes (national road authority)',
        url: 'https://www.ageroute.ci/',
      },
    ],
    notes:
      "No SVG assets currently on Wikimedia Commons. Côte d'Ivoire uses a French-influenced sign system. The national road authority is AGEROUTE (Agence de Gestion des Routes). Official sign specifications are not publicly available online.",
    driveSide: 'right',
    languages: ['French'],
    regulator: 'Ministère des Transports',
  },
  cm: {
    name: 'Cameroon',
    standard: 'Vienna Convention / French-influenced (CEMAC Highway Code)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Cameroon',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Cameroon',
      },
      {
        label: 'Ministère des Transports du Cameroun (national transport authority)',
        url: 'https://www.mintransports.gov.cm/',
      },
      {
        label: 'Road signs in Cameroon — sign guide (third-party)',
        url: 'https://temovision.com/highway-code-road-signs-meaning-in-cameroon/',
      },
    ],
    notes:
      "No SVG assets currently on Wikimedia Commons. Cameroon uses the CEMAC (Communauté Économique et Monétaire de l'Afrique Centrale) highway code, a French-influenced regional standard. Official sign PDFs are not publicly available online.",
    driveSide: 'right',
    languages: ['French', 'English'],
    regulator: 'Ministry of Transport',
  },
  xk: {
    name: 'Kosovo',
    standard: 'Vienna Convention (Ligji për Siguri në Komunikacion Rrugor)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Kosovo',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Kosovo',
      },
    ],
    notes:
      'No Kosovo-specific SVG sign diagrams exist on Wikimedia Commons. The sign set mirrors Serbia — Kosovo inherited the Yugoslav/Serbian road sign system and follows the Vienna Convention.',
  },
  ag: {
    name: 'Antigua and Barbuda',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Diagrams of road signs of Antigua and Barbuda',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Antigua_and_Barbuda',
      },
    ],
  },
  bb: {
    name: 'Barbados',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Barbados',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Barbados',
      },
    ],
    notes:
      'Very limited SVG coverage on Wikimedia Commons (give way and stop signs only). Barbados uses a British-derived sign system under the Road Traffic Act, administered by the Ministry of Transport and Works.',
  },
  bs: {
    name: 'Bahamas',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Diagrams of road signs of the Bahamas',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_the_Bahamas',
      },
    ],
    notes:
      'Very limited SVG coverage on Wikimedia Commons. The Bahamas uses a British-derived sign system under the Road Traffic Act.',
  },
  dm: {
    name: 'Dominica',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Diagrams of road signs of Dominica',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Dominica',
      },
    ],
    notes:
      'Very limited SVG coverage on Wikimedia Commons (give way sign only). Dominica uses a British-derived sign system under the Road Traffic Act.',
  },
  gd: {
    name: 'Grenada',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Grenada',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Grenada',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Grenada uses a British-derived sign system under the Road Traffic Act.',
  },
  kn: {
    name: 'Saint Kitts and Nevis',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Saint Kitts and Nevis',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Kitts_and_Nevis',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Saint Kitts and Nevis uses a British-derived sign system under the Road Traffic Act.',
  },
  lc: {
    name: 'Saint Lucia',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Saint Lucia',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Lucia',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Saint Lucia uses a British-derived sign system under the Road Traffic Act.',
  },
  sr: {
    name: 'Suriname',
    standard: 'Vienna Convention / Dutch-influenced (Verkeerstekenbesluit)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Suriname',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Suriname',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Netherlands',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Netherlands',
      },
      {
        label: 'Wikipedia — Road signs in the Netherlands',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Netherlands',
      },
    ],
    notes:
      'No Suriname-specific SVG sign diagrams exist on Wikimedia Commons. Suriname uses a Dutch-derived sign system inherited from the colonial period, virtually identical to Netherlands road signs (same Vienna Convention base, same series lettering A–L). This package mirrors the Netherlands sign set, following the same pattern as Monaco→France and San Marino→Italy.',
  },
  vc: {
    name: 'Saint Vincent and the Grenadines',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — Road signs in Saint Vincent and the Grenadines',
        url: 'https://commons.wikimedia.org/wiki/Category:Road_signs_in_Saint_Vincent_and_the_Grenadines',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Saint Vincent and the Grenadines uses a British-derived sign system under the Road Traffic Act.',
  },
  fj: {
    name: 'Fiji',
    standard: 'British-derived (Land Transport Act / MOTSAM)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Fiji',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Fiji',
      },
      {
        label: 'Fiji Roads Authority — MOTSAM documents',
        url: 'https://www.fijiroads.org/index.php/motsam-documents/',
      },
      { label: 'Land Transport Authority Fiji', url: 'https://www.lta.gov.fj/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Official sign specifications are published in the Fiji Roads Authority MOTSAM (Manual of Traffic Signs and Markings / Fiji Supplement to Austroads), available as PDF sections on the Fiji Roads Authority website.',
  },
  gy: {
    name: 'Guyana',
    standard: 'British-derived (Motor Vehicles and Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Guyana',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Guyana',
      },
      {
        label: 'Ministry of Public Works — road infrastructure authority',
        url: 'https://mopw.gov.gy/',
      },
      {
        label: 'Motor Vehicles and Road Traffic Act (PDF)',
        url: 'https://moha.gov.gy/wp-content/uploads/2021/04/Motor-Vehicle-and-Road-Act.pdf',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Guyana follows a British-derived sign system. Sign specifications are governed by the Motor Vehicles and Road Traffic Act, administered by the Ministry of Public Works.',
  },
  ht: {
    name: 'Haiti',
    standard: 'Vienna Convention / French-influenced (Code de la route)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Haiti',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Haiti',
      },
      {
        label: 'Ministère des Travaux Publics, Transports et Communications (MTPTC)',
        url: 'https://mtptc.gouv.ht/',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Haiti uses a French-influenced sign system based on the Vienna Convention. The governing authority is the Ministère des Travaux Publics, Transports et Communications (MTPTC). No publicly available official sign manual PDF has been located.',
  },
  iq: {
    name: 'Iraq',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Iraq',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iraq',
      },
      { label: 'Iraqi Ministry of Transport (وزارة النقل)', url: 'https://www.motrans.gov.iq/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Iraq uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.',
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Transport',
  },
  ir: {
    name: 'Iran',
    standard: 'Vienna Convention adjacent (Road Signs Manual of Iran)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Iran',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Iran',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Iran',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Iran',
      },
    ],
    driveSide: 'right',
    languages: ['Persian'],
    regulator: 'Ministry of Roads & Urban Development',
  },
  jm: {
    name: 'Jamaica',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Jamaica',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Jamaica',
      },
    ],
  },
  mc: {
    name: 'Monaco',
    standard: 'Vienna Convention (Code de la route) — shared with France',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Monaco',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Monaco',
      },
      {
        label: 'Wikimedia Commons — Diagrams of road signs of Monaco',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_Monaco',
      },
      {
        label: 'Direction de la Sûreté Publique de Monaco',
        url: 'https://www.gouv.mc/Action-Gouvernementale/La-Securite-des-Personnes/La-Surete-Publique',
      },
    ],
    notes:
      'Monaco uses the French sign system (Code de la route) without country-specific variants. SVG assets on Wikimedia Commons are limited to a small number of Monaco-specific signs. French sign packages (FR) provide comprehensive coverage of the shared sign set.',
  },
  mz: {
    name: 'Mozambique',
    standard: 'Vienna Convention / Portuguese-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Mozambique',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Mozambique',
      },
    ],
    driveSide: 'left',
    languages: ['Portuguese'],
    regulator: 'INATTER',
  },
  na: {
    name: 'Namibia',
    standard: 'South African-derived (Road Traffic and Transport Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Namibia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Namibia',
      },
    ],
    driveSide: 'left',
    languages: ['English'],
    regulator: 'Roads Authority',
  },
  pg: {
    name: 'Papua New Guinea',
    standard: 'British-derived (Motor Traffic Act / Road User Rules 2017)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Papua New Guinea',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Papua_New_Guinea',
      },
      { label: 'Road Traffic Authority Papua New Guinea', url: 'https://www.rta.gov.pg/' },
      {
        label: 'Road User Rules 2017 (PDF)',
        url: 'https://rta.gov.pg/pdfs/licences&approvals/RTR_RoadUserRules2017.pdf',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Papua New Guinea uses a British-derived sign system governed by the Road Traffic Authority (RTA) under the Road User Rules 2017.',
  },
  rw: {
    name: 'Rwanda',
    standard: 'Vienna Convention / Belgian-influenced',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Rwanda',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Rwanda',
      },
    ],
    driveSide: 'right',
    languages: ['Kinyarwanda', 'English', 'French'],
    regulator: 'RNRA',
  },
  sm: {
    name: 'San Marino',
    standard: 'Vienna Convention (Codice della strada) — shared with Italy',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in San Marino',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_San_Marino',
      },
      {
        label: 'Wikimedia Commons — Diagrams of road signs of San Marino',
        url: 'https://commons.wikimedia.org/wiki/Category:Diagrams_of_road_signs_of_San_Marino',
      },
      {
        label: "Segreteria di Stato per il Territorio e l'Ambiente (road authority)",
        url: 'https://www.gov.sm/pub/Siti/SSTA/home.html',
      },
    ],
    notes:
      'San Marino uses the Italian sign system (Codice della strada) without country-specific variants. SVG assets on Wikimedia Commons are very limited. Italian sign packages (IT) provide comprehensive coverage of the shared sign set.',
    driveSide: 'right',
    languages: ['Italian'],
    regulator: 'Italian Codice della Strada',
  },
  sn: {
    name: 'Senegal',
    standard: 'Vienna Convention / French-influenced (Code de la route sénégalais)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Senegal',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Senegal',
      },
      {
        label: 'Ministère des Infrastructures et des Transports Terrestres',
        url: 'https://www.transports.gouv.sn/',
      },
      { label: 'Code de la Route Sénégal (reference guide)', url: 'https://codesenegal.com/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Senegal uses a French-influenced Code de la Route based on the Vienna Convention. The governing authority is the Ministère des Infrastructures et des Transports Terrestres.',
    driveSide: 'right',
    languages: ['French'],
    regulator: 'Ministère des Infrastructures',
  },
  sy: {
    name: 'Syria',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Syria',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Syria',
      },
      { label: 'Syrian Ministry of Transport (وزارة النقل)', url: 'https://www.mot.gov.sy/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Syria uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.',
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Transport',
  },
  tt: {
    name: 'Trinidad and Tobago',
    standard: 'British-derived (Motor Vehicles and Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Trinidad and Tobago',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Trinidad_and_Tobago',
      },
      {
        label: 'Ministry of Works and Transport — Highways Division signage',
        url: 'https://www.mowt.gov.tt/Divisions/Highways-Division/Services/Highways-Signage',
      },
      {
        label: 'Trinidad and Tobago Highway Code (TTRegs)',
        url: 'https://www.ttregs.com/thc-the-highway-code.php',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Trinidad and Tobago uses a British-derived sign system under the Motor Vehicles and Road Traffic Act, administered by the Ministry of Works and Transport.',
  },
  ug: {
    name: 'Uganda',
    standard: 'British-derived (Traffic and Road Safety Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Uganda',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Uganda',
      },
    ],
    driveSide: 'left',
    languages: ['English'],
    regulator: 'Ministry of Works and Transport',
  },
  ye: {
    name: 'Yemen',
    standard: 'Vienna Convention, bilingual Arabic/English',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Yemen',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Yemen',
      },
      { label: 'Yemen Ministry of Transport (وزارة النقل)', url: 'https://www.mot.gov.ye/' },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Yemen uses bilingual Arabic/English signs based on the Vienna Convention. No publicly available official sign manual PDF has been located.',
    driveSide: 'right',
    languages: ['Arabic'],
    regulator: 'Ministry of Public Works',
  },
  zm: {
    name: 'Zambia',
    standard: 'British-derived (Roads and Road Traffic Act)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in Zambia',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Zambia',
      },
    ],
    driveSide: 'left',
    languages: ['English'],
    regulator: 'RTSA',
  },
  ao: {
    name: 'Angola',
    standard: 'Vienna Convention / Portuguese-influenced (Código da Estrada)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Angola',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Angola',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in Angola',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Angola',
      },
    ],
    notes:
      'No SVG assets currently on Wikimedia Commons. Angola uses a Portuguese-influenced sign system based on the Vienna Convention with codes A (warning), B (priority), C (prohibition), D (mandatory), H/M (information).',
    driveSide: 'right',
    languages: ['Portuguese'],
    regulator: 'INSTT',
  },
  ls: {
    name: 'Lesotho',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Southern African Development Community',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Lesotho uses the SADC regional sign standard. No Lesotho-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
    driveSide: 'left',
    languages: ['English', 'Sesotho'],
    regulator: 'Department of Traffic',
  },
  sz: {
    name: 'Eswatini',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Southern African Development Community',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Eswatini uses the SADC regional sign standard. No Eswatini-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
    driveSide: 'left',
    languages: ['English', 'Swazi'],
    regulator: 'Eswatini Road Safety Council',
  },
  kp: {
    name: 'North Korea',
    standard: 'DPRK road sign system (도로 표시)',
    sources: [
      {
        label: 'Wikimedia Commons — SVG road signs in North Korea',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_North_Korea',
      },
    ],
    notes:
      'North Korean road signs use Korean-language names with no alphanumeric codes. The 29 SVG diagrams on Wikimedia Commons are mapped to descriptive English slugs.',
    driveSide: 'right',
    languages: ['Korean'],
    regulator: 'DPRK Ministry of Public Security',
  },
  mw: {
    name: 'Malawi',
    standard: 'SADC regional standard (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Road signs in the Southern African Development Community',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_the_Southern_African_Development_Community',
      },
      {
        label: 'Wikimedia Commons — SVG road signs in the Southern African Development Community',
        url: 'https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_the_Southern_African_Development_Community',
      },
    ],
    notes:
      'Malawi uses the SADC regional sign standard. No Malawi-specific SVG diagrams exist on Wikimedia Commons; signs are sourced from the shared SADC category.',
    driveSide: 'left',
    languages: ['English'],
    regulator: 'Directorate of Road Traffic',
  },
  va: {
    name: 'Vatican City',
    standard: 'Italian Codice della Strada (re-exported from @road-signs/it)',
    sources: [
      {
        label: 'Wikipedia — Road signs in Italy (Vatican uses the Italian system)',
        url: 'https://en.wikipedia.org/wiki/Road_signs_in_Italy',
      },
    ],
    notes:
      'Vatican City is fully integrated into the Italian road-sign system. @road-signs/va re-exports @road-signs/it.',
    driveSide: 'right',
    languages: ['Italian', 'Latin'],
    regulator: 'Italian Codice della Strada (de facto)',
  },
  af: {
    name: 'Afghanistan',
    standard: 'Vienna Convention adjacent (Ministry of Public Works)',
    sources: [
      {
        label: 'Wikipedia — Transport in Afghanistan',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Afghanistan',
      },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Awaiting future PDF/web scrape.',
  },
  bf: {
    name: 'Burkina Faso',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Burkina Faso',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Burkina_Faso',
      },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely uses the French Vienna-Convention sign system with local variants.',
  },
  bh: {
    name: 'Bahrain',
    standard: 'GCC Traffic Signs Manual (bilingual Arabic/English)',
    sources: [
      {
        label: 'Wikipedia — Transport in Bahrain',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Bahrain',
      },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Bahrain follows the shared GCC Traffic Signs Manual.',
    driveSide: 'right',
    languages: ['Arabic', 'English'],
    regulator: 'GCC Manual',
  },
  bi: {
    name: 'Burundi',
    standard: 'Code de la route (French / Belgian influence)',
    sources: [
      {
        label: 'Wikipedia — Transport in Burundi',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Burundi',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  bj: {
    name: 'Benin',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Benin',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Benin',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  bt: {
    name: 'Bhutan',
    standard: 'Bhutan Road Safety and Transport Authority (RSTA)',
    sources: [
      {
        label: 'Wikipedia — Transport in Bhutan',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Bhutan',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
    driveSide: 'left',
    languages: ['Dzongkha'],
    regulator: 'RSTA',
  },
  cd: {
    name: 'DR Congo',
    standard: 'Code de la route (French/Belgian-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Democratic Republic of the Congo',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Democratic_Republic_of_the_Congo',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  cf: {
    name: 'Central African Republic',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Central African Republic',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Central_African_Republic',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  cg: {
    name: 'Republic of the Congo',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Republic of the Congo',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Republic_of_the_Congo',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  cv: {
    name: 'Cape Verde',
    standard: 'Código da Estrada (Portuguese-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Cape Verde',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Cape_Verde',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  dj: {
    name: 'Djibouti',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Djibouti',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Djibouti',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  er: {
    name: 'Eritrea',
    standard: 'Italian-influenced (Codice della Strada heritage)',
    sources: [
      {
        label: 'Wikipedia — Transport in Eritrea',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Eritrea',
      },
    ],
    notes:
      'Minimal package: 6 SVGs sourced from Wikimedia Commons (1 stop sign + 5 PNH national-highway shields). Bhutan\'s full RSTA sign catalogue is not published online; this is a starter set.',
  },
  fm: {
    name: 'Federated States of Micronesia',
    standard: 'US MUTCD-influenced (Compact of Free Association)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Federated States of Micronesia',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Federated_States_of_Micronesia',
      },
    ],
    notes:
      'Minimal package: 1 SVG from Commons (Give Way). Full GCC Traffic Signs Manual catalogue is not on Commons; this is a placeholder.',
  },
  ga: {
    name: 'Gabon',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Gabon',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Gabon',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  gm: {
    name: 'Gambia',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Gambia',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Gambia',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  gn: {
    name: 'Guinea',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Guinea',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Guinea',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  gq: {
    name: 'Equatorial Guinea',
    standard: 'Spanish-influenced (Reglamento General de Circulación heritage)',
    sources: [
      {
        label: 'Wikipedia — Transport in Equatorial Guinea',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Equatorial_Guinea',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  gw: {
    name: 'Guinea-Bissau',
    standard: 'Código da Estrada (Portuguese-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Guinea-Bissau',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Guinea-Bissau',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  ki: {
    name: 'Kiribati',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Transport in Kiribati',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Kiribati',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  km: {
    name: 'Comoros',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Comoros',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Comoros',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  lr: {
    name: 'Liberia',
    standard: 'US MUTCD-influenced',
    sources: [
      {
        label: 'Wikipedia — Transport in Liberia',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Liberia',
      },
    ],
    notes:
      'Minimal package: 3 SVGs from the "Liberian Road Signs" Commons series (Stop, Yield, No Entry). Likely follows a US-influenced system; full catalogue not online.',
  },
  mh: {
    name: 'Marshall Islands',
    standard: 'US MUTCD-influenced (Compact of Free Association)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Marshall Islands',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Marshall_Islands',
      },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely follows US MUTCD under the Compact of Free Association.',
  },
  ml: {
    name: 'Mali',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Mali',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Mali',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  mr: {
    name: 'Mauritania',
    standard: 'Code de la route (French / Arabic bilingual)',
    sources: [
      {
        label: 'Wikipedia — Transport in Mauritania',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Mauritania',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  mv: {
    name: 'Maldives',
    standard: 'British-derived (Maldives Transport Authority)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Maldives',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Maldives',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  ne: {
    name: 'Niger',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Niger',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Niger',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  nr: {
    name: 'Nauru',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Transport in Nauru',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Nauru',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  ps: {
    name: 'Palestine',
    standard: 'Bilingual Arabic/English/Hebrew (Israeli-derived in West Bank)',
    sources: [
      {
        label: 'Wikipedia — Transport in the Palestinian territories',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Palestinian_territories',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
    driveSide: 'right',
    languages: ['Arabic', 'Hebrew', 'English'],
    regulator: 'PA Ministry of Transport',
  },
  pw: {
    name: 'Palau',
    standard: 'US MUTCD-influenced (Compact of Free Association)',
    sources: [
      {
        label: 'Wikipedia — Transport in Palau',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Palau',
      },
    ],
    notes:
      'Empty package: no publicly available SVG sign catalogue located. Likely follows US MUTCD under the Compact of Free Association.',
  },
  sb: {
    name: 'Solomon Islands',
    standard: 'British-derived (Road Transport Act)',
    sources: [
      {
        label: 'Inland Revenue Division — Solomon Islands',
        url: 'https://www.ird.gov.sb/',
      },
      {
        label: 'Wikipedia — Transport in the Solomon Islands',
        url: 'https://en.wikipedia.org/wiki/Transport_in_the_Solomon_Islands',
      },
    ],
    notes:
      'Empty package. Investigated 2026-06-13: the IRD "Guide to Obtaining a Driver’s Licence" PDF is a one-page procedural document with no sign diagrams. No Wikimedia Commons category for Solomon Islands road signs exists. Awaiting an on-the-ground catalogue or a recovered Road Transport Regulations 2014 gazette.',
  },
  sc: {
    name: 'Seychelles',
    standard: 'British-derived (Road Transport Act)',
    sources: [
      {
        label: 'Wikipedia — Transport in Seychelles',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Seychelles',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  sd: {
    name: 'Sudan',
    standard: 'British-derived (Highway Code)',
    sources: [
      {
        label: 'Wikipedia — Transport in Sudan',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Sudan',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  sl: {
    name: 'Sierra Leone',
    standard: 'British-derived (Sierra Leone Road Safety Authority)',
    sources: [
      {
        label: 'Wikipedia — Transport in Sierra Leone',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Sierra_Leone',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  so: {
    name: 'Somalia',
    standard: 'Italian heritage / British-influenced (Highway Code)',
    sources: [
      {
        label: 'Wikipedia — Transport in Somalia',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Somalia',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  ss: {
    name: 'South Sudan',
    standard: 'British-derived (Highway Code)',
    sources: [
      {
        label: 'Wikipedia — Transport in South Sudan',
        url: 'https://en.wikipedia.org/wiki/Transport_in_South_Sudan',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  st: {
    name: 'São Tomé and Príncipe',
    standard: 'Código da Estrada (Portuguese-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in São Tomé and Príncipe',
        url: 'https://en.wikipedia.org/wiki/Transport_in_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  td: {
    name: 'Chad',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Chad',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Chad',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  tg: {
    name: 'Togo',
    standard: 'Code de la route (French-influenced)',
    sources: [
      {
        label: 'Wikipedia — Transport in Togo',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Togo',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  tl: {
    name: 'Timor-Leste',
    standard: 'Portuguese / Indonesian-influenced',
    sources: [
      {
        label: 'Wikipedia — Transport in East Timor',
        url: 'https://en.wikipedia.org/wiki/Transport_in_East_Timor',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  to: {
    name: 'Tonga',
    standard: 'British-derived (Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Transport in Tonga',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Tonga',
      },
    ],
    notes: 'Minimal package: 2 SVGs from Commons (Stop, Give Way). Tonga\'s full catalogue is not online.',
  },
  tv: {
    name: 'Tuvalu',
    standard: 'British-derived (Road Traffic Act)',
    sources: [
      {
        label: 'Wikipedia — Transport in Tuvalu',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Tuvalu',
      },
    ],
    notes: 'Empty package: no publicly available SVG sign catalogue located.',
  },
  vu: {
    name: 'Vanuatu',
    standard: 'British / French-influenced bilingual',
    sources: [
      {
        label: 'Wikipedia — Transport in Vanuatu',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Vanuatu',
      },
    ],
    notes: 'Minimal package: 1 SVG from Commons (Stop sign). Vanuatu\'s full catalogue is not online.',
  },
  ws: {
    name: 'Samoa',
    standard: 'New Zealand-derived (Land Transport Authority)',
    sources: [
      {
        label: 'Wikipedia — Transport in Samoa',
        url: 'https://en.wikipedia.org/wiki/Transport_in_Samoa',
      },
    ],
    notes: 'Minimal package: 2 SVGs from Commons (Ford warning, Speed Limit). Samoa\'s full catalogue is not online.',
  },
};

// ---------------------------------------------------------------------------
// Coverage computation
// ---------------------------------------------------------------------------

interface CategoryStats {
  scraped: number;
  withSvg: number;
}

interface CountryCoverage {
  cc: string;
  meta: CountryMeta;
  totalScraped: number;
  totalWithSvg: number;
  categories: Record<string, CategoryStats>;
}

const normalise = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const buildLocalPathTokens = (assetsRoot: string): string[] =>
  globSync(path.join(assetsRoot, '**', '*.svg'))
    .filter((f) => !/_\d+x\d+\.svg$/.test(f))
    .map((f) =>
      f
        .replace(/\\/g, '/')
        .toLowerCase()
        .replace(/[^a-z0-9/]/g, ''),
    );

const sanitize = (s: string): string =>
  s
    .replace(/[/\\?%*:|"<>]/g, '_')
    .replace(/\s/g, '_')
    .toLowerCase();

const svgExistsForCode = (code: string, pathTokens: string[], assetsRoot: string): boolean => {
  const dirs = globSync(path.join(assetsRoot, '*', sanitize(code)));
  if (dirs.some((d) => globSync(path.join(d, '*.svg')).length > 0)) return true;
  const token = normalise(code);
  if (token.length < 2) return false;
  return pathTokens.some((p) => p.includes(token));
};

const computeCoverage = (cc: string): CountryCoverage | null => {
  if (!COUNTRIES[cc]) return null;
  const scrapedPath = path.join('data', cc, 'scraped.json');

  // Country has metadata but no scrape yet — emit a zero-coverage record so
  // the docs page still gets a `## Coverage` section that honestly says
  // "no signs scraped yet".
  if (!fs.existsSync(scrapedPath)) {
    return { cc, meta: COUNTRIES[cc], totalScraped: 0, totalWithSvg: 0, categories: {} };
  }

  const scraped: Record<string, Array<{ code: string; name: string }>> = JSON.parse(
    fs.readFileSync(scrapedPath, 'utf-8'),
  );
  const assetsRoot = path.join('packages', '@road-signs', cc, 'assets');
  const pathTokens = buildLocalPathTokens(assetsRoot);

  const categories: Record<string, CategoryStats> = {};
  for (const [category, signs] of Object.entries(scraped)) {
    let withSvg = 0;
    for (const sign of signs) {
      if (svgExistsForCode(sign.code, pathTokens, assetsRoot)) withSvg++;
    }
    categories[category] = { scraped: signs.length, withSvg };
  }

  const totalScraped = Object.values(categories).reduce((s, c) => s + c.scraped, 0);
  const totalWithSvg = Object.values(categories).reduce((s, c) => s + c.withSvg, 0);

  return { cc, meta: COUNTRIES[cc], totalScraped, totalWithSvg, categories };
};

// ---------------------------------------------------------------------------
// Markdown helpers
// ---------------------------------------------------------------------------

const pct = (n: number, total: number): string =>
  total === 0 ? '—' : `${Math.round((n / total) * 100)}%`;

// ---------------------------------------------------------------------------
// Coverage section body (shared between the package docs and the Astro site)
// ---------------------------------------------------------------------------

const coverageSectionBody = (cov: CountryCoverage): string => {
  const { meta, totalScraped, totalWithSvg, categories } = cov;
  const missing = totalScraped - totalWithSvg;

  const lines: string[] = [
    `## Coverage`,
    ``,
    `| Metric | Value |`,
    `| ------ | ----- |`,
    `| Signs scraped | ${totalScraped} |`,
    `| Signs with SVG | ${totalWithSvg} |`,
    `| Missing SVG | ${missing} |`,
    `| Overall | **${pct(totalWithSvg, totalScraped)}** |`,
    ``,
    `| Category | Scraped | With SVG | Missing | % |`,
    `| -------- | ------: | -------: | ------: | -: |`,
  ];

  for (const [cat, stats] of Object.entries(categories)) {
    const miss = stats.scraped - stats.withSvg;
    lines.push(
      `| \`${cat}\` | ${stats.scraped} | ${stats.withSvg} | ${miss} | ${pct(stats.withSvg, stats.scraped)} |`,
    );
  }

  lines.push(``, `**Standard:** ${meta.standard}`, ``);
  lines.push(`**SVG sources:**`, ``);
  for (const src of meta.sources) {
    lines.push(`- [${src.label}](${src.url})`);
  }

  if (meta.notes) {
    lines.push(``, `:::note`, meta.notes, `:::`);
  }

  // Link back to the full coverage package page.
  lines.push(
    ``,
    `_Coverage data is also published in the [\`@road-signs/docs\`](https://www.npmjs.com/package/@road-signs/docs) package._`,
  );

  return lines.join('\n');
};

// ---------------------------------------------------------------------------
// Per-country standalone markdown (for @road-signs/docs package)
// ---------------------------------------------------------------------------

const generateCountryDoc = (cov: CountryCoverage): string => {
  const { cc, meta, totalScraped, totalWithSvg, categories } = cov;
  const pctTotal = pct(totalWithSvg, totalScraped);
  const missing = totalScraped - totalWithSvg;

  const lines: string[] = [
    `# ${meta.name} (${cc.toUpperCase()})`,
    ``,
    `**Standard:** ${meta.standard}`,
    ``,
    `**Package:** [\`@road-signs/${cc}\`](https://www.npmjs.com/package/@road-signs/${cc})`,
    ``,
    `## SVG Coverage`,
    ``,
    `| Metric | Value |`,
    `| ------ | ----- |`,
    `| Total signs scraped | ${totalScraped} |`,
    `| Signs with SVG asset | ${totalWithSvg} |`,
    `| Missing SVG | ${missing} |`,
    `| Overall coverage | **${pctTotal}** |`,
    ``,
    `## Coverage by Category`,
    ``,
    `| Category | Scraped | With SVG | Missing | Coverage |`,
    `| -------- | ------: | -------: | ------: | -------: |`,
  ];

  for (const [cat, stats] of Object.entries(categories)) {
    const miss = stats.scraped - stats.withSvg;
    lines.push(
      `| \`${cat}\` | ${stats.scraped} | ${stats.withSvg} | ${miss} | ${pct(stats.withSvg, stats.scraped)} |`,
    );
  }

  lines.push(``, `## Sources`, ``);
  for (const src of meta.sources) {
    lines.push(`- [${src.label}](${src.url})`);
  }

  if (meta.notes) {
    lines.push(``, `## Notes`, ``, meta.notes);
  }

  return lines.join('\n') + '\n';
};

// ---------------------------------------------------------------------------
// Overview README (for @road-signs/docs package)
// ---------------------------------------------------------------------------

const generateOverview = (coverages: CountryCoverage[]): string => {
  const now = new Date().toISOString().slice(0, 10);

  const lines: string[] = [
    `# @road-signs/docs`,
    ``,
    `Coverage documentation for the [\`@road-signs/*\`](https://github.com/karlnorling/road-signs) packages.`,
    `All SVG assets are sourced from [Wikimedia Commons](https://commons.wikimedia.org/) and are in the public domain`,
    `(Creative Commons or similar open licences).`,
    ``,
    `_Last updated: ${now}_`,
    ``,
    `## Coverage Summary`,
    ``,
    `| Country | Package | Signs | SVG | Missing | Coverage |`,
    `| ------- | ------- | ----: | --: | ------: | -------: |`,
  ];

  for (const cov of coverages) {
    const { cc, meta, totalScraped, totalWithSvg } = cov;
    const miss = totalScraped - totalWithSvg;
    lines.push(
      `| [${meta.name}](./coverage/${cc}.md) | [\`@road-signs/${cc}\`](https://www.npmjs.com/package/@road-signs/${cc}) | ${totalScraped} | ${totalWithSvg} | ${miss} | ${pct(totalWithSvg, totalScraped)} |`,
    );
  }

  lines.push(
    ``,
    `## Sources`,
    ``,
    `All SVGs are sourced from Wikimedia Commons under open licences (CC BY-SA or public domain).`,
    `The US package additionally draws from the FHWA Standard Highway Signs archive (public domain).`,
    ``,
    `See the per-country pages under [coverage/](./coverage/) for detailed source links and notes.`,
    ``,
    `## Licence`,
    ``,
    `Documentation and generated data: MIT.`,
    `SVG assets: see individual Wikimedia Commons file pages for per-file licences.`,
  );

  return lines.join('\n') + '\n';
};

// ---------------------------------------------------------------------------
// Astro MDX injection
// ---------------------------------------------------------------------------

const MARKER_START = '{/* COVERAGE:START */}';
const MARKER_END = '{/* COVERAGE:END */}';
const HERO_START = '{/* HERO:START */}';
const HERO_END = '{/* HERO:END */}';
const QUICK_FACTS_START = '{/* QUICK_FACTS:START */}';
const QUICK_FACTS_END = '{/* QUICK_FACTS:END */}';
const USAGE_START = '{/* USAGE:START */}';
const USAGE_END = '{/* USAGE:END */}';

const heroBlock = (cc: string): string =>
  `${HERO_START}\n\n` +
  `import CountryHero from '../../../components/CountryHero.astro';\n\n` +
  `<CountryHero cc="${cc}" />\n\n` +
  `${HERO_END}`;

/**
 * Renders a country's Quick facts table — only shows rows that have data,
 * skips the block entirely if no field is populated.
 */
const quickFactsSectionBody = (cov: CountryCoverage): string | null => {
  const { meta } = cov;
  const driveLabel = meta.driveSide
    ? { left: 'Left-hand', right: 'Right-hand', mixed: 'Mixed' }[meta.driveSide]
    : null;

  const rows: Array<[string, string]> = [];
  if (driveLabel) rows.push(['Drive side', driveLabel]);
  if (meta.languages && meta.languages.length > 0) {
    rows.push(['Language(s)', meta.languages.join(', ')]);
  }
  if (meta.regulator) rows.push(['Regulator', meta.regulator]);
  if (meta.codePrefix) rows.push(['Code format', `\`${meta.codePrefix}\``]);
  rows.push(['Standard', meta.standard]);

  if (rows.length === 1) return null; // only the standard row → already shown in Coverage

  const lines: string[] = ['## Quick facts', '', '| Field | Value |', '| ----- | ----- |'];
  for (const [k, v] of rows) lines.push(`| ${k} | ${v} |`);
  return lines.join('\n');
};

const quickFactsBlock = (cov: CountryCoverage): string | null => {
  const body = quickFactsSectionBody(cov);
  if (!body) return null;
  return `${QUICK_FACTS_START}\n\n${body}\n\n${QUICK_FACTS_END}`;
};

interface SampleSign {
  id: string;
  code: string;
  category: string;
}

/**
 * Heuristic: does this string look like a real sign code (e.g. "W1-1",
 * "101", "A.1", "Zeichen 274") rather than a stale slug-as-code from the
 * pre-review buggy extractor (e.g. "sign-101-danger-...-the-danger")?
 *
 * The fallback path in older scrapes would slugify the description and use
 * THAT as the code, producing very long strings with English words. Real
 * codes are short, mostly digits + a short letter prefix.
 */
const looksLikeRealCode = (code: string): boolean => {
  if (code.length > 16) return false;
  if (/^\d+$/.test(code)) return true; // numeric: UK / FI / NO / JP / KR
  // Allow 1–4 letter prefix + numbers + optional letter suffix, possibly
  // with dots or dashes (W1-1, A.1, Zeichen 274's "274", etc.).
  return /^[A-Za-z]{0,4}[-. ]?\d+[\w.-]*$/.test(code);
};

/**
 * Pulls a representative sign from a country's signs.generated.ts (or its
 * shard files) so docs code-samples reference codes that actually exist.
 * Returns null for empty packages.
 *
 * Preference order:
 *   1. First entry whose `code` looks like a real sign code.
 *   2. Failing that, the very first entry (better than nothing).
 */
const extractSampleSign = (cc: string): SampleSign | null => {
  const srcDir = path.join('packages', '@road-signs', cc, 'src');
  const primary = path.join(srcDir, 'signs.generated.ts');
  if (!fs.existsSync(primary)) return null;

  // Build the list of source files: either the primary OR every shard.
  const sources: string[] = [];
  const primarySrc = fs.readFileSync(primary, 'utf-8');
  const shardMatches = [
    ...primarySrc.matchAll(/from\s+['"]\.\/(signs\.[a-z0-9_]+\.generated)['"]/gi),
  ];
  if (shardMatches.length > 0) {
    for (const m of shardMatches) {
      const f = path.join(srcDir, `${m[1]}.ts`);
      if (fs.existsSync(f)) sources.push(f);
    }
  } else {
    sources.push(primary);
  }

  let first: SampleSign | null = null;
  for (const f of sources) {
    const src = fs.readFileSync(f, 'utf-8');
    // Split by sign-literal closers (the closing `  },` lines we use during
    // sharding). Within each block, capture each field independently so the
    // field order doesn't matter.
    for (const blockSrc of src.split(/\n  \},\n/)) {
      const codeM = blockSrc.match(/\bcode:\s*"([^"]+)"/);
      const idM = blockSrc.match(/\bid:\s*"([^"]+)"/);
      const catM = blockSrc.match(/\bcategory:\s*"([^"]+)"/);
      if (!codeM || !idM || !catM) continue;
      const candidate: SampleSign = { id: idM[1], code: codeM[1], category: catM[1] };
      if (!first) first = candidate;
      if (looksLikeRealCode(candidate.code)) return candidate;
    }
  }
  return first;
};

/**
 * Render the Usage section's <Tabs> block, substituting real sign codes
 * when available. Falls back to neutral placeholders for empty packages.
 */
const usageSectionBody = (cc: string, sample: SampleSign | null): string => {
  const upper = cc.toUpperCase();
  const idSample = sample ? sample.id : 'example-sign';
  const codeSample = sample ? sample.code : 'EXAMPLE-CODE';
  const categorySample = sample ? sample.category : 'warning';
  const sampleComment = sample
    ? `// Example below uses the real ${upper} sign "${sample.code}" — adjust to taste.`
    : `// Placeholders — replace with real codes once @road-signs/${cc} ships a registry.`;

  return [
    '## Usage',
    '',
    '<Tabs>',
    '  <TabItem label="TypeScript">',
    '    ```ts',
    `    import { signs, getSign, getSignByCode, getSignsByCategory } from '@road-signs/${cc}';`,
    '',
    `    ${sampleComment}`,
    '',
    '    // All signs',
    '    signs.length;',
    '',
    '    // By slug ID',
    `    const sign = getSign("${idSample}");`,
    '',
    '    // By sign code',
    `    const s = getSignByCode("${codeSample}");`,
    '',
    `    // All ${categorySample} signs`,
    `    const filtered = getSignsByCategory("${categorySample}");`,
    '    ```',
    '  </TabItem>',
    '  <TabItem label="React">',
    '    ```tsx',
    `    import { getSignsByCategory } from '@road-signs/${cc}';`,
    "    import { RoadSign } from '@road-signs/react';",
    '',
    `    const ${categorySample}Signs = getSignsByCategory("${categorySample}");`,
    '',
    `    export default function ${cc.toUpperCase()}Grid() {`,
    '      return (',
    "        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>",
    `          {${categorySample}Signs.map((sign) => (`,
    '            <RoadSign key={sign.id} sign={sign} size={64} />',
    '          ))}',
    '        </div>',
    '      );',
    '    }',
    '    ```',
    '  </TabItem>',
    '  <TabItem label="Vue 3">',
    '    ```vue',
    '    <script setup>',
    `    import { getSignsByCategory } from '@road-signs/${cc}';`,
    "    import { RoadSign } from '@road-signs/vue';",
    '',
    `    const ${categorySample}Signs = getSignsByCategory("${categorySample}");`,
    '    </script>',
    '',
    '    <template>',
    '      <div style="display:flex;gap:8px;flex-wrap:wrap">',
    `        <RoadSign v-for="sign in ${categorySample}Signs" :key="sign.id" :sign="sign" :size="64" />`,
    '      </div>',
    '    </template>',
    '    ```',
    '  </TabItem>',
    '</Tabs>',
  ].join('\n');
};

const usageBlock = (cc: string, sample: SampleSign | null): string =>
  `${USAGE_START}\n\n${usageSectionBody(cc, sample)}\n\n${USAGE_END}`;

/**
 * Replace content between `start` and `end` markers if both are present.
 * Returns the new content and a flag indicating whether the replace happened.
 */
const replaceBetween = (
  content: string,
  start: string,
  end: string,
  replacement: string,
): { content: string; replaced: boolean } => {
  if (!content.includes(start) || !content.includes(end)) {
    return { content, replaced: false };
  }
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end);
  if (endIdx <= startIdx) return { content, replaced: false };
  const after = content.slice(endIdx + end.length);
  return {
    content: content.slice(0, startIdx) + replacement + '\n' + after.replace(/^\n*/, '\n'),
    replaced: true,
  };
};

/**
 * Inject (or replace) the hero strip just after the MDX frontmatter and any
 * initial `import { Tabs, ... }` lines. Uses HERO_START / HERO_END markers
 * so subsequent runs replace cleanly. Idempotent.
 */
const injectHeroMdx = (mdxPath: string, cc: string): void => {
  if (!fs.existsSync(mdxPath)) return;
  let content = fs.readFileSync(mdxPath, 'utf-8');
  const block = heroBlock(cc);

  const updated = replaceBetween(content, HERO_START, HERO_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: insert after the frontmatter closing `---` plus any leading
  // import lines (so the hero ends up just below the page title but above
  // the first prose paragraph).
  const fmEnd = content.indexOf('\n---\n');
  if (fmEnd === -1) return;
  let cursor = fmEnd + 5;
  // Skip blank lines and `import ...;` lines.
  const after = content.slice(cursor);
  const importMatch = after.match(/^(?:\s*\n|import\s+[^\n]*;\s*\n)+/);
  if (importMatch) cursor += importMatch[0].length;

  content = content.slice(0, cursor) + '\n' + block + '\n\n' + content.slice(cursor);
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the Usage section's <Tabs> block with one that uses a
 * real sign code from the country's registry. Idempotent. On first run,
 * wraps the existing hand-written ## Usage + <Tabs> region (located by
 * scanning for `## Usage` and the matching `</Tabs>`) so subsequent runs
 * can replace it via markers.
 */
const injectUsageMdx = (mdxPath: string, cc: string): void => {
  if (!fs.existsSync(mdxPath)) return;
  const sample = extractSampleSign(cc);
  const block = usageBlock(cc, sample);

  let content = fs.readFileSync(mdxPath, 'utf-8');

  const updated = replaceBetween(content, USAGE_START, USAGE_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: locate the existing `## Usage\n\n<Tabs>` … `</Tabs>` span and
  // replace it in-place. If we can't find one, append the block at the end
  // (before TypeScript types) — the page just gets a fresh Usage section.
  const usageHeadingIdx = content.indexOf('## Usage');
  const tabsCloseIdx = usageHeadingIdx === -1 ? -1 : content.indexOf('</Tabs>', usageHeadingIdx);
  if (usageHeadingIdx !== -1 && tabsCloseIdx !== -1) {
    const before = content.slice(0, usageHeadingIdx);
    const after = content.slice(tabsCloseIdx + '</Tabs>'.length);
    content = before + block + after;
    fs.writeFileSync(mdxPath, content, 'utf-8');
    return;
  }

  // No usage section to replace — insert before TypeScript types if present,
  // else append to end.
  const tsAnchor = '\n## TypeScript types';
  const insertAt = content.indexOf(tsAnchor);
  if (insertAt !== -1) {
    content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  } else {
    content = content.trimEnd() + '\n\n' + block + '\n';
  }
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the Quick facts block right after the HERO. Skips
 * silently if no quick-facts data is available. Idempotent.
 */
const injectQuickFactsMdx = (mdxPath: string, cov: CountryCoverage): void => {
  if (!fs.existsSync(mdxPath)) return;
  const block = quickFactsBlock(cov);

  let content = fs.readFileSync(mdxPath, 'utf-8');

  // If there's no data to show, remove any previous quick-facts block.
  if (!block) {
    const updated = replaceBetween(content, QUICK_FACTS_START, QUICK_FACTS_END, '');
    if (updated.replaced) fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  const updated = replaceBetween(content, QUICK_FACTS_START, QUICK_FACTS_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // First run: insert after the HERO block (or after frontmatter if hero
  // hasn't been injected yet).
  let insertAt: number;
  const heroEndIdx = content.indexOf(HERO_END);
  if (heroEndIdx !== -1) {
    insertAt = heroEndIdx + HERO_END.length;
  } else {
    const fmEnd = content.indexOf('\n---\n');
    if (fmEnd === -1) return;
    insertAt = fmEnd + 5;
    const after = content.slice(insertAt);
    const importMatch = after.match(/^(?:\s*\n|import\s+[^\n]*;\s*\n)+/);
    if (importMatch) insertAt += importMatch[0].length;
  }

  content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  fs.writeFileSync(mdxPath, content, 'utf-8');
};

/**
 * Inject (or replace) the coverage section in a country MDX file.
 * The section is wrapped in marker comments so future runs replace it cleanly.
 * It is inserted just before `## TypeScript types` (or appended if not found).
 * Any existing hand-written `## Coverage gaps` section is replaced.
 */
const injectCoverageMdx = (mdxPath: string, cov: CountryCoverage): void => {
  if (!fs.existsSync(mdxPath)) return;

  let content = fs.readFileSync(mdxPath, 'utf-8');

  const block = `${MARKER_START}\n\n${coverageSectionBody(cov)}\n\n${MARKER_END}`;

  const updated = replaceBetween(content, MARKER_START, MARKER_END, block);
  if (updated.replaced) {
    fs.writeFileSync(mdxPath, updated.content, 'utf-8');
    return;
  }

  // Remove any legacy hand-written coverage sections (## Coverage gaps / ## Coverage).
  content = content.replace(/\n## Coverage[^\n]*\n[\s\S]*?(?=\n## |\s*$)/g, '\n');

  // Insert before ## TypeScript types, or append.
  const tsAnchor = '\n## TypeScript types';
  const insertAt = content.indexOf(tsAnchor);
  if (insertAt !== -1) {
    content = content.slice(0, insertAt) + '\n\n' + block + '\n' + content.slice(insertAt);
  } else {
    content = content.trimEnd() + '\n\n' + block + '\n';
  }

  fs.writeFileSync(mdxPath, content, 'utf-8');
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

const docsDir = path.join('packages', '@road-signs', 'docs');
const coverageDir = path.join(docsDir, 'coverage');
const astroPagesDir = path.join('apps', 'docs', 'src', 'content', 'docs', 'countries');

const coverages = Object.keys(COUNTRIES)
  .map(computeCoverage)
  .filter((c): c is CountryCoverage => c !== null);

fs.mkdirSync(coverageDir, { recursive: true });

console.log('Writing @road-signs/docs package...');
for (const cov of coverages) {
  const outPath = path.join(coverageDir, `${cov.cc}.md`);
  fs.writeFileSync(outPath, generateCountryDoc(cov), 'utf-8');
  console.log(`  ${outPath}`);
}
const readmePath = path.join(docsDir, 'README.md');
fs.writeFileSync(readmePath, generateOverview(coverages), 'utf-8');
console.log(`  ${readmePath}`);

console.log('\nInjecting hero strip + coverage sections into Astro docs...');
for (const cov of coverages) {
  const mdxPath = path.join(astroPagesDir, `${cov.cc}.mdx`);
  // Skip the hero if the country has no signs at all (e.g. Lebanon).
  if (cov.totalScraped > 0) injectHeroMdx(mdxPath, cov.cc);
  injectQuickFactsMdx(mdxPath, cov);
  injectUsageMdx(mdxPath, cov.cc);
  injectCoverageMdx(mdxPath, cov);
  console.log(`  ${mdxPath}`);
}

console.log(`\nDone — ${coverages.length} countries documented.`);
