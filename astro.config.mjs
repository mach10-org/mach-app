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
      //  // Import a component’s default export
      //     // generates:
      //     // import A from './src/components/A.astro';
      //     './src/components/A.astro',

      //     {
      //       // Explicitly alias a default export
      //       // generates:
      //       // import { default as B } from './src/components/B.astro';
      //       './src/components/B.astro': [['default', 'B']],

      //       // Import a module’s named exports
      //       // generates:
      //       // import { Tweet, YouTube } from 'astro-embed';
      //       'astro-embed': ['Tweet', 'YouTube'],
      //     },
      imports: [
        './src/components/Quizz.astro',
        {
          './src/components/Quiz/Quiz.jsx': ['Quiz']
        }
      ]
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
