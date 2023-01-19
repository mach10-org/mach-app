import { defineConfig } from 'astro/config';
import remarkMermaid from 'astro-diagram/remark-mermaid';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vue from '@astrojs/vue';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  markdown: {
    remarkPlugins: [remarkMermaid]
  },
  integrations: [
    tailwind(),
    mdx(),
    vue({
      jsx: true
    })
  ]
});
