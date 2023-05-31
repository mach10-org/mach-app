import { defineConfig } from 'astro/config';
import remarkMermaid from 'astro-diagram/remark-mermaid';
import AutoImport from 'astro-auto-import';
import remarkGFM from 'remark-gfm';
import { remarkReadingTime } from './src/plugin/remark-reading-time.mjs';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://mach10-org.github.io/',
  base: '/mach-app/',
  // output: 'server',
  output: 'hybrid',
  trailingSlash: 'always',
  experimental: {
    hybridOutput: true
  },

  markdown: {
    remarkPlugins: [remarkMermaid, remarkGFM, remarkReadingTime],
    gfm: true,
    drafts: false,
    extendDefaultPlugins: true
  },
  integrations: [
    AutoImport({
      imports: [
        {
          './src/components/Quiz': ['Quiz']
        }
      ]
    }),
    tailwind(),
    mdx(),
    vue({
      jsx: true
    }),
    sitemap(),
    react()
  ]
});
