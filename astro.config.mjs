import { defineConfig } from 'astro/config';
import remarkMermaid from 'astro-diagram/remark-mermaid';
import AutoImport from 'astro-auto-import';
import remarkGFM from 'remark-gfm';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vue from '@astrojs/vue';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mach10-org.github.io/',
  base: '/mach-app/',
  // output: 'server',

  markdown: {
    remarkPlugins: [remarkMermaid, remarkGFM],
    gfm: true,
    drafts: false
  },
  integrations: [
    AutoImport({
      // import { Tweet, YouTube } from 'astro-embed';
      // 'astro-embed': ['Tweet', 'YouTube'],
      // Explicitly alias a default export
      // generates:
      // import { default as Quizz } from './src/components/Quizz.astro';
      // imports: [{ './src/components/Quizz.astro': [['default', 'Quizz']] }]
      // Import a component’s default export
      // generates:
      // import Quizz from './src/components/Quizz.astro';
      imports: ['./src/components/Quizz.astro']
    }),

    tailwind(),
    mdx({
      remarkPlugins: [remarkMermaid, remarkGFM],
      drafts: false,
      gfm: true
    }),
    vue({
      jsx: true
    }),
    sitemap()
  ]
});
