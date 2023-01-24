import { defineConfig } from 'astro/config';
import remarkMermaid from 'astro-diagram/remark-mermaid';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vue from '@astrojs/vue';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://mach10-org.github.io/',
  base: '/mach-app/',
  // output: 'server',
  markdown: {
    remarkPlugins: [remarkMermaid]
  },
  integrations: [
    tailwind(),
    mdx(),
    vue({
      jsx: true
    }),
    sitemap()
  ]
});
