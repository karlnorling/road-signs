import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = (name) => resolve(__dirname, `../../packages/@road-signs/${name}/src/index.ts`);

// All country packages available in the docs site.
const countryCodes = [
  'core',
  'ad',
  'ae',
  'ag',
  'al',
  'am',
  'ao',
  'ar',
  'at',
  'au',
  'az',
  'ba',
  'bb',
  'bd',
  'be',
  'bg',
  'bn',
  'bo',
  'br',
  'bs',
  'bw',
  'by',
  'bz',
  'ca',
  'ch',
  'ci',
  'cl',
  'cm',
  'cn',
  'co',
  'cr',
  'cu',
  'cy',
  'cz',
  'de',
  'dk',
  'dm',
  'do',
  'dz',
  'ec',
  'ee',
  'eg',
  'es',
  'et',
  'fj',
  'fi',
  'fr',
  'gd',
  'ge',
  'gh',
  'gr',
  'gt',
  'gy',
  'hn',
  'ht',
  'hr',
  'hu',
  'id',
  'ie',
  'il',
  'in',
  'iq',
  'ir',
  'is',
  'it',
  'jm',
  'jo',
  'jp',
  'ke',
  'kg',
  'kh',
  'kn',
  'kp',
  'kr',
  'kw',
  'kz',
  'xk',
  'la',
  'lb',
  'lc',
  'li',
  'lk',
  'ls',
  'lt',
  'lu',
  'lv',
  'ly',
  'ma',
  'mc',
  'md',
  'me',
  'mg',
  'mk',
  'mm',
  'mn',
  'mt',
  'mu',
  'mw',
  'mx',
  'my',
  'mz',
  'na',
  'ng',
  'ni',
  'nl',
  'no',
  'np',
  'nz',
  'om',
  'pa',
  'pe',
  'pg',
  'ph',
  'pk',
  'pl',
  'pt',
  'py',
  'qa',
  'ro',
  'rs',
  'ru',
  'rw',
  'sa',
  'se',
  'sg',
  'si',
  'sk',
  'sm',
  'sn',
  'sr',
  'sv',
  'sy',
  'sz',
  'th',
  'tj',
  'tm',
  'tn',
  'tr',
  'tt',
  'tw',
  'tz',
  'ua',
  'ug',
  'uk',
  'us',
  'uy',
  'uz',
  'vc',
  've',
  'vn',
  'ye',
  'za',
  'zm',
  'zw',
];

// Only alias packages that actually have a src/index.ts on disk. Otherwise
// Vite happily registers the alias and the first MDX import blows up the build
// with `Failed to resolve import`.
const aliasedCountries = countryCodes.filter((cc) => existsSync(pkg(cc)));
const missingCountries = countryCodes.filter((cc) => !existsSync(pkg(cc)));
if (missingCountries.length > 0) {
  // eslint-disable-next-line no-console
  console.warn(
    `[astro.config] Skipping aliases for un-scaffolded packages: ${missingCountries.join(', ')}`,
  );
}

export default defineConfig({
  site: 'https://karlnorling.github.io',
  base: '/road-signs',
  vite: {
    resolve: {
      alias: Object.fromEntries(aliasedCountries.map((cc) => [`@road-signs/${cc}`, pkg(cc)])),
    },
  },
  integrations: [
    starlight({
      title: 'Road Signs',
      description: 'Road sign SVGs, React, Vue 3, and web components — one package per country.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/karlnorling/road-signs',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/karlnorling/road-signs/edit/main/apps/docs/',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: '' },
            { label: 'Getting started', slug: 'getting-started' },
          ],
        },
        {
          label: 'Countries',
          items: [
            {
              label: 'Americas',
              items: [
                {
                  label: 'United States (US)',
                  items: [
                    { label: 'Overview', slug: 'countries/us' },
                    { label: 'Gallery', slug: 'gallery/us' },
                  ],
                },
                {
                  label: 'Canada (CA)',
                  items: [
                    { label: 'Overview', slug: 'countries/ca' },
                    { label: 'Gallery', slug: 'gallery/ca' },
                  ],
                },
                {
                  label: 'Mexico (MX)',
                  items: [
                    { label: 'Overview', slug: 'countries/mx' },
                    { label: 'Gallery', slug: 'gallery/mx' },
                  ],
                },
                {
                  label: 'Brazil (BR)',
                  items: [
                    { label: 'Overview', slug: 'countries/br' },
                    { label: 'Gallery', slug: 'gallery/br' },
                  ],
                },
                {
                  label: 'Argentina (AR)',
                  items: [
                    { label: 'Overview', slug: 'countries/ar' },
                    { label: 'Gallery', slug: 'gallery/ar' },
                  ],
                },
                {
                  label: 'Chile (CL)',
                  items: [
                    { label: 'Overview', slug: 'countries/cl' },
                    { label: 'Gallery', slug: 'gallery/cl' },
                  ],
                },
                {
                  label: 'Colombia (CO)',
                  items: [
                    { label: 'Overview', slug: 'countries/co' },
                    { label: 'Gallery', slug: 'gallery/co' },
                  ],
                },
                {
                  label: 'Belize (BZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/bz' },
                    { label: 'Gallery', slug: 'gallery/bz' },
                  ],
                },
                {
                  label: 'Bolivia (BO)',
                  items: [
                    { label: 'Overview', slug: 'countries/bo' },
                    { label: 'Gallery', slug: 'gallery/bo' },
                  ],
                },
                {
                  label: 'Costa Rica (CR)',
                  items: [
                    { label: 'Overview', slug: 'countries/cr' },
                    { label: 'Gallery', slug: 'gallery/cr' },
                  ],
                },
                {
                  label: 'Cuba (CU)',
                  items: [
                    { label: 'Overview', slug: 'countries/cu' },
                    { label: 'Gallery', slug: 'gallery/cu' },
                  ],
                },
                {
                  label: 'Dominican Republic (DO)',
                  items: [
                    { label: 'Overview', slug: 'countries/do' },
                    { label: 'Gallery', slug: 'gallery/do' },
                  ],
                },
                {
                  label: 'Ecuador (EC)',
                  items: [
                    { label: 'Overview', slug: 'countries/ec' },
                    { label: 'Gallery', slug: 'gallery/ec' },
                  ],
                },
                {
                  label: 'El Salvador (SV)',
                  items: [
                    { label: 'Overview', slug: 'countries/sv' },
                    { label: 'Gallery', slug: 'gallery/sv' },
                  ],
                },
                {
                  label: 'Guatemala (GT)',
                  items: [
                    { label: 'Overview', slug: 'countries/gt' },
                    { label: 'Gallery', slug: 'gallery/gt' },
                  ],
                },
                {
                  label: 'Honduras (HN)',
                  items: [
                    { label: 'Overview', slug: 'countries/hn' },
                    { label: 'Gallery', slug: 'gallery/hn' },
                  ],
                },
                {
                  label: 'Nicaragua (NI)',
                  items: [
                    { label: 'Overview', slug: 'countries/ni' },
                    { label: 'Gallery', slug: 'gallery/ni' },
                  ],
                },
                {
                  label: 'Panama (PA)',
                  items: [
                    { label: 'Overview', slug: 'countries/pa' },
                    { label: 'Gallery', slug: 'gallery/pa' },
                  ],
                },
                {
                  label: 'Paraguay (PY)',
                  items: [
                    { label: 'Overview', slug: 'countries/py' },
                    { label: 'Gallery', slug: 'gallery/py' },
                  ],
                },
                {
                  label: 'Peru (PE)',
                  items: [
                    { label: 'Overview', slug: 'countries/pe' },
                    { label: 'Gallery', slug: 'gallery/pe' },
                  ],
                },
                {
                  label: 'Uruguay (UY)',
                  items: [
                    { label: 'Overview', slug: 'countries/uy' },
                    { label: 'Gallery', slug: 'gallery/uy' },
                  ],
                },
                {
                  label: 'Venezuela (VE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ve' },
                    { label: 'Gallery', slug: 'gallery/ve' },
                  ],
                },
                {
                  label: 'Guyana (GY)',
                  items: [
                    { label: 'Overview', slug: 'countries/gy' },
                    { label: 'Gallery', slug: 'gallery/gy' },
                  ],
                },
                {
                  label: 'Haiti (HT)',
                  items: [
                    { label: 'Overview', slug: 'countries/ht' },
                    { label: 'Gallery', slug: 'gallery/ht' },
                  ],
                },
                {
                  label: 'Jamaica (JM)',
                  items: [
                    { label: 'Overview', slug: 'countries/jm' },
                    { label: 'Gallery', slug: 'gallery/jm' },
                  ],
                },
                {
                  label: 'Suriname (SR)',
                  items: [
                    { label: 'Overview', slug: 'countries/sr' },
                    { label: 'Gallery', slug: 'gallery/sr' },
                  ],
                },
                {
                  label: 'Trinidad and Tobago (TT)',
                  items: [
                    { label: 'Overview', slug: 'countries/tt' },
                    { label: 'Gallery', slug: 'gallery/tt' },
                  ],
                },
                {
                  label: 'Antigua and Barbuda (AG)',
                  items: [
                    { label: 'Overview', slug: 'countries/ag' },
                    { label: 'Gallery', slug: 'gallery/ag' },
                  ],
                },
                {
                  label: 'Bahamas (BS)',
                  items: [
                    { label: 'Overview', slug: 'countries/bs' },
                    { label: 'Gallery', slug: 'gallery/bs' },
                  ],
                },
                {
                  label: 'Barbados (BB)',
                  items: [
                    { label: 'Overview', slug: 'countries/bb' },
                    { label: 'Gallery', slug: 'gallery/bb' },
                  ],
                },
                {
                  label: 'Dominica (DM)',
                  items: [
                    { label: 'Overview', slug: 'countries/dm' },
                    { label: 'Gallery', slug: 'gallery/dm' },
                  ],
                },
                {
                  label: 'Grenada (GD)',
                  items: [
                    { label: 'Overview', slug: 'countries/gd' },
                    { label: 'Gallery', slug: 'gallery/gd' },
                  ],
                },
                {
                  label: 'Saint Kitts and Nevis (KN)',
                  items: [
                    { label: 'Overview', slug: 'countries/kn' },
                    { label: 'Gallery', slug: 'gallery/kn' },
                  ],
                },
                {
                  label: 'Saint Lucia (LC)',
                  items: [
                    { label: 'Overview', slug: 'countries/lc' },
                    { label: 'Gallery', slug: 'gallery/lc' },
                  ],
                },
                {
                  label: 'Saint Vincent and the Grenadines (VC)',
                  items: [
                    { label: 'Overview', slug: 'countries/vc' },
                    { label: 'Gallery', slug: 'gallery/vc' },
                  ],
                },
              ],
            },
            {
              label: 'Europe',
              items: [
                {
                  label: 'Albania (AL)',
                  items: [
                    { label: 'Overview', slug: 'countries/al' },
                    { label: 'Gallery', slug: 'gallery/al' },
                  ],
                },
                {
                  label: 'Austria (AT)',
                  items: [
                    { label: 'Overview', slug: 'countries/at' },
                    { label: 'Gallery', slug: 'gallery/at' },
                  ],
                },
                {
                  label: 'Armenia (AM)',
                  items: [
                    { label: 'Overview', slug: 'countries/am' },
                    { label: 'Gallery', slug: 'gallery/am' },
                  ],
                },
                {
                  label: 'Azerbaijan (AZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/az' },
                    { label: 'Gallery', slug: 'gallery/az' },
                  ],
                },
                {
                  label: 'Belarus (BY)',
                  items: [
                    { label: 'Overview', slug: 'countries/by' },
                    { label: 'Gallery', slug: 'gallery/by' },
                  ],
                },
                {
                  label: 'Belgium (BE)',
                  items: [
                    { label: 'Overview', slug: 'countries/be' },
                    { label: 'Gallery', slug: 'gallery/be' },
                  ],
                },
                {
                  label: 'Bosnia and Herzegovina (BA)',
                  items: [
                    { label: 'Overview', slug: 'countries/ba' },
                    { label: 'Gallery', slug: 'gallery/ba' },
                  ],
                },
                {
                  label: 'Bulgaria (BG)',
                  items: [
                    { label: 'Overview', slug: 'countries/bg' },
                    { label: 'Gallery', slug: 'gallery/bg' },
                  ],
                },
                {
                  label: 'Croatia (HR)',
                  items: [
                    { label: 'Overview', slug: 'countries/hr' },
                    { label: 'Gallery', slug: 'gallery/hr' },
                  ],
                },
                {
                  label: 'Cyprus (CY)',
                  items: [
                    { label: 'Overview', slug: 'countries/cy' },
                    { label: 'Gallery', slug: 'gallery/cy' },
                  ],
                },
                {
                  label: 'Czech Republic (CZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/cz' },
                    { label: 'Gallery', slug: 'gallery/cz' },
                  ],
                },
                {
                  label: 'Denmark (DK)',
                  items: [
                    { label: 'Overview', slug: 'countries/dk' },
                    { label: 'Gallery', slug: 'gallery/dk' },
                  ],
                },
                {
                  label: 'Estonia (EE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ee' },
                    { label: 'Gallery', slug: 'gallery/ee' },
                  ],
                },
                {
                  label: 'Finland (FI)',
                  items: [
                    { label: 'Overview', slug: 'countries/fi' },
                    { label: 'Gallery', slug: 'gallery/fi' },
                  ],
                },
                {
                  label: 'France (FR)',
                  items: [
                    { label: 'Overview', slug: 'countries/fr' },
                    { label: 'Gallery', slug: 'gallery/fr' },
                  ],
                },
                {
                  label: 'Georgia (GE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ge' },
                    { label: 'Gallery', slug: 'gallery/ge' },
                  ],
                },
                {
                  label: 'Germany (DE)',
                  items: [
                    { label: 'Overview', slug: 'countries/de' },
                    { label: 'Gallery', slug: 'gallery/de' },
                  ],
                },
                {
                  label: 'Greece (GR)',
                  items: [
                    { label: 'Overview', slug: 'countries/gr' },
                    { label: 'Gallery', slug: 'gallery/gr' },
                  ],
                },
                {
                  label: 'Hungary (HU)',
                  items: [
                    { label: 'Overview', slug: 'countries/hu' },
                    { label: 'Gallery', slug: 'gallery/hu' },
                  ],
                },
                {
                  label: 'Iceland (IS)',
                  items: [
                    { label: 'Overview', slug: 'countries/is' },
                    { label: 'Gallery', slug: 'gallery/is' },
                  ],
                },
                {
                  label: 'Ireland (IE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ie' },
                    { label: 'Gallery', slug: 'gallery/ie' },
                  ],
                },
                {
                  label: 'Italy (IT)',
                  items: [
                    { label: 'Overview', slug: 'countries/it' },
                    { label: 'Gallery', slug: 'gallery/it' },
                  ],
                },
                {
                  label: 'Latvia (LV)',
                  items: [
                    { label: 'Overview', slug: 'countries/lv' },
                    { label: 'Gallery', slug: 'gallery/lv' },
                  ],
                },
                {
                  label: 'Liechtenstein (LI)',
                  items: [
                    { label: 'Overview', slug: 'countries/li' },
                    { label: 'Gallery', slug: 'gallery/li' },
                  ],
                },
                {
                  label: 'Lithuania (LT)',
                  items: [
                    { label: 'Overview', slug: 'countries/lt' },
                    { label: 'Gallery', slug: 'gallery/lt' },
                  ],
                },
                {
                  label: 'Luxembourg (LU)',
                  items: [
                    { label: 'Overview', slug: 'countries/lu' },
                    { label: 'Gallery', slug: 'gallery/lu' },
                  ],
                },
                {
                  label: 'Malta (MT)',
                  items: [
                    { label: 'Overview', slug: 'countries/mt' },
                    { label: 'Gallery', slug: 'gallery/mt' },
                  ],
                },
                {
                  label: 'Montenegro (ME)',
                  items: [
                    { label: 'Overview', slug: 'countries/me' },
                    { label: 'Gallery', slug: 'gallery/me' },
                  ],
                },
                {
                  label: 'Netherlands (NL)',
                  items: [
                    { label: 'Overview', slug: 'countries/nl' },
                    { label: 'Gallery', slug: 'gallery/nl' },
                  ],
                },
                {
                  label: 'North Macedonia (MK)',
                  items: [
                    { label: 'Overview', slug: 'countries/mk' },
                    { label: 'Gallery', slug: 'gallery/mk' },
                  ],
                },
                {
                  label: 'Norway (NO)',
                  items: [
                    { label: 'Overview', slug: 'countries/no' },
                    { label: 'Gallery', slug: 'gallery/no' },
                  ],
                },
                {
                  label: 'Poland (PL)',
                  items: [
                    { label: 'Overview', slug: 'countries/pl' },
                    { label: 'Gallery', slug: 'gallery/pl' },
                  ],
                },
                {
                  label: 'Portugal (PT)',
                  items: [
                    { label: 'Overview', slug: 'countries/pt' },
                    { label: 'Gallery', slug: 'gallery/pt' },
                  ],
                },
                {
                  label: 'Moldova (MD)',
                  items: [
                    { label: 'Overview', slug: 'countries/md' },
                    { label: 'Gallery', slug: 'gallery/md' },
                  ],
                },
                {
                  label: 'Romania (RO)',
                  items: [
                    { label: 'Overview', slug: 'countries/ro' },
                    { label: 'Gallery', slug: 'gallery/ro' },
                  ],
                },
                {
                  label: 'Russia (RU)',
                  items: [
                    { label: 'Overview', slug: 'countries/ru' },
                    { label: 'Gallery', slug: 'gallery/ru' },
                  ],
                },
                {
                  label: 'Serbia (RS)',
                  items: [
                    { label: 'Overview', slug: 'countries/rs' },
                    { label: 'Gallery', slug: 'gallery/rs' },
                  ],
                },
                {
                  label: 'Kosovo (XK)',
                  items: [
                    { label: 'Overview', slug: 'countries/xk' },
                    { label: 'Gallery', slug: 'gallery/xk' },
                  ],
                },
                {
                  label: 'Slovakia (SK)',
                  items: [
                    { label: 'Overview', slug: 'countries/sk' },
                    { label: 'Gallery', slug: 'gallery/sk' },
                  ],
                },
                {
                  label: 'Slovenia (SI)',
                  items: [
                    { label: 'Overview', slug: 'countries/si' },
                    { label: 'Gallery', slug: 'gallery/si' },
                  ],
                },
                {
                  label: 'Spain (ES)',
                  items: [
                    { label: 'Overview', slug: 'countries/es' },
                    { label: 'Gallery', slug: 'gallery/es' },
                  ],
                },
                {
                  label: 'Sweden (SE)',
                  items: [
                    { label: 'Overview', slug: 'countries/se' },
                    { label: 'Gallery', slug: 'gallery/se' },
                  ],
                },
                {
                  label: 'Switzerland (CH)',
                  items: [
                    { label: 'Overview', slug: 'countries/ch' },
                    { label: 'Gallery', slug: 'gallery/ch' },
                  ],
                },
                {
                  label: 'Ukraine (UA)',
                  items: [
                    { label: 'Overview', slug: 'countries/ua' },
                    { label: 'Gallery', slug: 'gallery/ua' },
                  ],
                },
                {
                  label: 'United Kingdom (UK)',
                  items: [
                    { label: 'Overview', slug: 'countries/uk' },
                    { label: 'Gallery', slug: 'gallery/uk' },
                  ],
                },
                {
                  label: 'Andorra (AD)',
                  items: [
                    { label: 'Overview', slug: 'countries/ad' },
                    { label: 'Gallery', slug: 'gallery/ad' },
                  ],
                },
                {
                  label: 'Monaco (MC)',
                  items: [
                    { label: 'Overview', slug: 'countries/mc' },
                    { label: 'Gallery', slug: 'gallery/mc' },
                  ],
                },
                {
                  label: 'San Marino (SM)',
                  items: [
                    { label: 'Overview', slug: 'countries/sm' },
                    { label: 'Gallery', slug: 'gallery/sm' },
                  ],
                },
              ],
            },
            {
              label: 'Asia & Pacific',
              items: [
                {
                  label: 'Australia (AU)',
                  items: [
                    { label: 'Overview', slug: 'countries/au' },
                    { label: 'Gallery', slug: 'gallery/au' },
                  ],
                },
                {
                  label: 'Bangladesh (BD)',
                  items: [
                    { label: 'Overview', slug: 'countries/bd' },
                    { label: 'Gallery', slug: 'gallery/bd' },
                  ],
                },
                {
                  label: 'Brunei (BN)',
                  items: [
                    { label: 'Overview', slug: 'countries/bn' },
                    { label: 'Gallery', slug: 'gallery/bn' },
                  ],
                },
                {
                  label: 'Cambodia (KH)',
                  items: [
                    { label: 'Overview', slug: 'countries/kh' },
                    { label: 'Gallery', slug: 'gallery/kh' },
                  ],
                },
                {
                  label: 'China (CN)',
                  items: [
                    { label: 'Overview', slug: 'countries/cn' },
                    { label: 'Gallery', slug: 'gallery/cn' },
                  ],
                },
                {
                  label: 'India (IN)',
                  items: [
                    { label: 'Overview', slug: 'countries/in' },
                    { label: 'Gallery', slug: 'gallery/in' },
                  ],
                },
                {
                  label: 'Indonesia (ID)',
                  items: [
                    { label: 'Overview', slug: 'countries/id' },
                    { label: 'Gallery', slug: 'gallery/id' },
                  ],
                },
                {
                  label: 'Japan (JP)',
                  items: [
                    { label: 'Overview', slug: 'countries/jp' },
                    { label: 'Gallery', slug: 'gallery/jp' },
                  ],
                },
                {
                  label: 'Kazakhstan (KZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/kz' },
                    { label: 'Gallery', slug: 'gallery/kz' },
                  ],
                },
                {
                  label: 'Kyrgyzstan (KG)',
                  items: [
                    { label: 'Overview', slug: 'countries/kg' },
                    { label: 'Gallery', slug: 'gallery/kg' },
                  ],
                },
                {
                  label: 'Malaysia (MY)',
                  items: [
                    { label: 'Overview', slug: 'countries/my' },
                    { label: 'Gallery', slug: 'gallery/my' },
                  ],
                },
                {
                  label: 'Laos (LA)',
                  items: [
                    { label: 'Overview', slug: 'countries/la' },
                    { label: 'Gallery', slug: 'gallery/la' },
                  ],
                },
                {
                  label: 'Mongolia (MN)',
                  items: [
                    { label: 'Overview', slug: 'countries/mn' },
                    { label: 'Gallery', slug: 'gallery/mn' },
                  ],
                },
                {
                  label: 'Myanmar (MM)',
                  items: [
                    { label: 'Overview', slug: 'countries/mm' },
                    { label: 'Gallery', slug: 'gallery/mm' },
                  ],
                },
                {
                  label: 'Nepal (NP)',
                  items: [
                    { label: 'Overview', slug: 'countries/np' },
                    { label: 'Gallery', slug: 'gallery/np' },
                  ],
                },
                {
                  label: 'New Zealand (NZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/nz' },
                    { label: 'Gallery', slug: 'gallery/nz' },
                  ],
                },
                {
                  label: 'Pakistan (PK)',
                  items: [
                    { label: 'Overview', slug: 'countries/pk' },
                    { label: 'Gallery', slug: 'gallery/pk' },
                  ],
                },
                {
                  label: 'Philippines (PH)',
                  items: [
                    { label: 'Overview', slug: 'countries/ph' },
                    { label: 'Gallery', slug: 'gallery/ph' },
                  ],
                },
                {
                  label: 'Singapore (SG)',
                  items: [
                    { label: 'Overview', slug: 'countries/sg' },
                    { label: 'Gallery', slug: 'gallery/sg' },
                  ],
                },
                {
                  label: 'South Korea (KR)',
                  items: [
                    { label: 'Overview', slug: 'countries/kr' },
                    { label: 'Gallery', slug: 'gallery/kr' },
                  ],
                },
                {
                  label: 'Sri Lanka (LK)',
                  items: [
                    { label: 'Overview', slug: 'countries/lk' },
                    { label: 'Gallery', slug: 'gallery/lk' },
                  ],
                },
                {
                  label: 'Taiwan (TW)',
                  items: [
                    { label: 'Overview', slug: 'countries/tw' },
                    { label: 'Gallery', slug: 'gallery/tw' },
                  ],
                },
                {
                  label: 'Tajikistan (TJ)',
                  items: [
                    { label: 'Overview', slug: 'countries/tj' },
                    { label: 'Gallery', slug: 'gallery/tj' },
                  ],
                },
                {
                  label: 'Thailand (TH)',
                  items: [
                    { label: 'Overview', slug: 'countries/th' },
                    { label: 'Gallery', slug: 'gallery/th' },
                  ],
                },
                {
                  label: 'Turkmenistan (TM)',
                  items: [
                    { label: 'Overview', slug: 'countries/tm' },
                    { label: 'Gallery', slug: 'gallery/tm' },
                  ],
                },
                {
                  label: 'Uzbekistan (UZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/uz' },
                    { label: 'Gallery', slug: 'gallery/uz' },
                  ],
                },
                {
                  label: 'Vietnam (VN)',
                  items: [
                    { label: 'Overview', slug: 'countries/vn' },
                    { label: 'Gallery', slug: 'gallery/vn' },
                  ],
                },
                {
                  label: 'Fiji (FJ)',
                  items: [
                    { label: 'Overview', slug: 'countries/fj' },
                    { label: 'Gallery', slug: 'gallery/fj' },
                  ],
                },
                {
                  label: 'Papua New Guinea (PG)',
                  items: [
                    { label: 'Overview', slug: 'countries/pg' },
                    { label: 'Gallery', slug: 'gallery/pg' },
                  ],
                },
                {
                  label: 'North Korea (KP)',
                  items: [
                    { label: 'Overview', slug: 'countries/kp' },
                    { label: 'Gallery', slug: 'gallery/kp' },
                  ],
                },
              ],
            },
            {
              label: 'Middle East & Africa',
              items: [
                {
                  label: 'Algeria (DZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/dz' },
                    { label: 'Gallery', slug: 'gallery/dz' },
                  ],
                },
                {
                  label: 'Egypt (EG)',
                  items: [
                    { label: 'Overview', slug: 'countries/eg' },
                    { label: 'Gallery', slug: 'gallery/eg' },
                  ],
                },
                {
                  label: 'Israel (IL)',
                  items: [
                    { label: 'Overview', slug: 'countries/il' },
                    { label: 'Gallery', slug: 'gallery/il' },
                  ],
                },
                {
                  label: 'Jordan (JO)',
                  items: [
                    { label: 'Overview', slug: 'countries/jo' },
                    { label: 'Gallery', slug: 'gallery/jo' },
                  ],
                },
                {
                  label: 'Kenya (KE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ke' },
                    { label: 'Gallery', slug: 'gallery/ke' },
                  ],
                },
                {
                  label: 'Kuwait (KW)',
                  items: [
                    { label: 'Overview', slug: 'countries/kw' },
                    { label: 'Gallery', slug: 'gallery/kw' },
                  ],
                },
                {
                  label: 'Lebanon (LB)',
                  items: [
                    { label: 'Overview', slug: 'countries/lb' },
                    { label: 'Gallery', slug: 'gallery/lb' },
                  ],
                },
                {
                  label: 'Libya (LY)',
                  items: [
                    { label: 'Overview', slug: 'countries/ly' },
                    { label: 'Gallery', slug: 'gallery/ly' },
                  ],
                },
                {
                  label: 'Morocco (MA)',
                  items: [
                    { label: 'Overview', slug: 'countries/ma' },
                    { label: 'Gallery', slug: 'gallery/ma' },
                  ],
                },
                {
                  label: 'Nigeria (NG)',
                  items: [
                    { label: 'Overview', slug: 'countries/ng' },
                    { label: 'Gallery', slug: 'gallery/ng' },
                  ],
                },
                {
                  label: 'Oman (OM)',
                  items: [
                    { label: 'Overview', slug: 'countries/om' },
                    { label: 'Gallery', slug: 'gallery/om' },
                  ],
                },
                {
                  label: 'Qatar (QA)',
                  items: [
                    { label: 'Overview', slug: 'countries/qa' },
                    { label: 'Gallery', slug: 'gallery/qa' },
                  ],
                },
                {
                  label: 'Saudi Arabia (SA)',
                  items: [
                    { label: 'Overview', slug: 'countries/sa' },
                    { label: 'Gallery', slug: 'gallery/sa' },
                  ],
                },
                {
                  label: 'Ethiopia (ET)',
                  items: [
                    { label: 'Overview', slug: 'countries/et' },
                    { label: 'Gallery', slug: 'gallery/et' },
                  ],
                },
                {
                  label: 'Ghana (GH)',
                  items: [
                    { label: 'Overview', slug: 'countries/gh' },
                    { label: 'Gallery', slug: 'gallery/gh' },
                  ],
                },
                {
                  label: 'South Africa (ZA)',
                  items: [
                    { label: 'Overview', slug: 'countries/za' },
                    { label: 'Gallery', slug: 'gallery/za' },
                  ],
                },
                {
                  label: 'Tanzania (TZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/tz' },
                    { label: 'Gallery', slug: 'gallery/tz' },
                  ],
                },
                {
                  label: 'Tunisia (TN)',
                  items: [
                    { label: 'Overview', slug: 'countries/tn' },
                    { label: 'Gallery', slug: 'gallery/tn' },
                  ],
                },
                {
                  label: 'Turkey (TR)',
                  items: [
                    { label: 'Overview', slug: 'countries/tr' },
                    { label: 'Gallery', slug: 'gallery/tr' },
                  ],
                },
                {
                  label: 'United Arab Emirates (AE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ae' },
                    { label: 'Gallery', slug: 'gallery/ae' },
                  ],
                },
                {
                  label: 'Zimbabwe (ZW)',
                  items: [
                    { label: 'Overview', slug: 'countries/zw' },
                    { label: 'Gallery', slug: 'gallery/zw' },
                  ],
                },
                {
                  label: 'Botswana (BW)',
                  items: [
                    { label: 'Overview', slug: 'countries/bw' },
                    { label: 'Gallery', slug: 'gallery/bw' },
                  ],
                },
                {
                  label: "Côte d'Ivoire (CI)",
                  items: [
                    { label: 'Overview', slug: 'countries/ci' },
                    { label: 'Gallery', slug: 'gallery/ci' },
                  ],
                },
                {
                  label: 'Cameroon (CM)',
                  items: [
                    { label: 'Overview', slug: 'countries/cm' },
                    { label: 'Gallery', slug: 'gallery/cm' },
                  ],
                },
                {
                  label: 'Iraq (IQ)',
                  items: [
                    { label: 'Overview', slug: 'countries/iq' },
                    { label: 'Gallery', slug: 'gallery/iq' },
                  ],
                },
                {
                  label: 'Iran (IR)',
                  items: [
                    { label: 'Overview', slug: 'countries/ir' },
                    { label: 'Gallery', slug: 'gallery/ir' },
                  ],
                },
                {
                  label: 'Mozambique (MZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/mz' },
                    { label: 'Gallery', slug: 'gallery/mz' },
                  ],
                },
                {
                  label: 'Namibia (NA)',
                  items: [
                    { label: 'Overview', slug: 'countries/na' },
                    { label: 'Gallery', slug: 'gallery/na' },
                  ],
                },
                {
                  label: 'Rwanda (RW)',
                  items: [
                    { label: 'Overview', slug: 'countries/rw' },
                    { label: 'Gallery', slug: 'gallery/rw' },
                  ],
                },
                {
                  label: 'Senegal (SN)',
                  items: [
                    { label: 'Overview', slug: 'countries/sn' },
                    { label: 'Gallery', slug: 'gallery/sn' },
                  ],
                },
                {
                  label: 'Syria (SY)',
                  items: [
                    { label: 'Overview', slug: 'countries/sy' },
                    { label: 'Gallery', slug: 'gallery/sy' },
                  ],
                },
                {
                  label: 'Uganda (UG)',
                  items: [
                    { label: 'Overview', slug: 'countries/ug' },
                    { label: 'Gallery', slug: 'gallery/ug' },
                  ],
                },
                {
                  label: 'Yemen (YE)',
                  items: [
                    { label: 'Overview', slug: 'countries/ye' },
                    { label: 'Gallery', slug: 'gallery/ye' },
                  ],
                },
                {
                  label: 'Zambia (ZM)',
                  items: [
                    { label: 'Overview', slug: 'countries/zm' },
                    { label: 'Gallery', slug: 'gallery/zm' },
                  ],
                },
                {
                  label: 'Angola (AO)',
                  items: [
                    { label: 'Overview', slug: 'countries/ao' },
                    { label: 'Gallery', slug: 'gallery/ao' },
                  ],
                },
                {
                  label: 'Lesotho (LS)',
                  items: [
                    { label: 'Overview', slug: 'countries/ls' },
                    { label: 'Gallery', slug: 'gallery/ls' },
                  ],
                },
                {
                  label: 'Eswatini (SZ)',
                  items: [
                    { label: 'Overview', slug: 'countries/sz' },
                    { label: 'Gallery', slug: 'gallery/sz' },
                  ],
                },
                {
                  label: 'Madagascar (MG)',
                  items: [
                    { label: 'Overview', slug: 'countries/mg' },
                    { label: 'Gallery', slug: 'gallery/mg' },
                  ],
                },
                {
                  label: 'Malawi (MW)',
                  items: [
                    { label: 'Overview', slug: 'countries/mw' },
                    { label: 'Gallery', slug: 'gallery/mw' },
                  ],
                },
                {
                  label: 'Mauritius (MU)',
                  items: [
                    { label: 'Overview', slug: 'countries/mu' },
                    { label: 'Gallery', slug: 'gallery/mu' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Packages',
          items: [
            { label: 'React', slug: 'packages/react' },
            { label: 'Vue 3', slug: 'packages/vue' },
            { label: 'Web Components', slug: 'packages/elements' },
            { label: 'Core API', slug: 'packages/core' },
          ],
        },
      ],
    }),
  ],
});
