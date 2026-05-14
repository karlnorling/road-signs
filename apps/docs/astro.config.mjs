import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = (name) => resolve(__dirname, `../../packages/@road-signs/${name}/src/index.ts`);

export default defineConfig({
  site: 'https://karlnorling.github.io',
  base: '/road-signs',
  vite: {
    resolve: {
      alias: {
        '@road-signs/core': pkg('core'),
        '@road-signs/us': pkg('us'),
      },
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
          items: [{ label: 'United States (US)', slug: 'countries/us' }],
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
        {
          label: 'Reference',
          items: [{ label: 'Sign Gallery', slug: 'gallery' }],
        },
      ],
    }),
  ],
});
