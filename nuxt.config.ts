// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  extends: [
    'nuxt-seo-kit',
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      siteName: 'Mach10',
      siteDescription: 'We are on a mission to transform lives of 10,000 people. Why not you? It starts today 👩🏻‍🚀',
      language: 'en-US',
      platform: process.env.NUXT_PUBLIC_PLATFORM || 'local',
      trailingSlash: false,
    },
  },
  routeRules: {
    '/journey': { ssr: false },
    '/schedule': { ssr: false },
    '/profile': { ssr: false },
    '/onboarding': { ssr: false },
  },

  modules: [
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-font-loader',
    '@nuxtjs/supabase',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@bg-dev/nuxt-naiveui',
    '@nuxt/image',
    'nuxt-icon',
  ],

  app: {
    head: {
      link: [
        {
          rel: 'icon', type: 'image/x-icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👩🏻‍🚀</text></svg>',
        },
      ],
    },
  },

  css: [
    '@unocss/reset/tailwind-compat.css',
  ],

  i18n: {
    strategy: process.env.NODE_ENV === 'development' ? 'prefix_except_default' : 'no_prefix',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
    defaultLocale: process.env.NODE_ENV === 'development' ? 'en' : 'ja',
    langDir: 'locales',
    detectBrowserLanguage: false,
    trailingSlash: false,
    baseUrl: process.env.BASE_URL,
    vueI18n: './i18n.config.ts',
  },

  lodash: {
    prefix: '_',
    prefixSkip: false,
    upperAfterPrefix: false,
  },

  fontLoader: {
    external: [
      {
        src: '/fonts/font-face.css',
        family: 'Inter',
        fallback: 'sans-serif',
      },
    ],
  },

  unocss: {
    preflight: false,
  },

  naiveui: {
    colorModePreference: 'light',
  },

  supabase: {
    redirect: false,
  },

  dayjs: {
    plugins: ['advancedFormat', 'isSameOrAfter', 'localizedFormat', 'utc', 'timezone', 'localeData', 'customParseFormat', 'isoWeek', 'duration'],
    locales: ['en', 'ja'],
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
      },
      preload: ['abap',
        'actionscript-3',
        'ada',
        'apache',
        'apex',
        'apl',
        'applescript',
        'ara',
        'asm',
        'astro',
        'awk',
        'ballerina',
        'bat', 'batch',
        'beancount',
        'berry', 'be',
        'bibtex',
        'bicep',
        'blade',
        'c',
        'cadence', 'cdc',
        'clarity',
        'clojure', 'clj',
        'cmake',
        'cobol',
        'codeql', 'ql',
        'coffee',
        'cpp',
        'crystal',
        'csharp', 'c#', 'cs',
        'css',
        'cue',
        'cypher', 'cql',
        'd',
        'dart',
        'dax',
        'diff',
        'docker', 'dockerfile',
        'dream-maker',
        'elixir',
        'elm',
        'erb',
        'erlang', 'erl',
        'fish',
        'fsharp', 'f#', 'fs',
        'gdresource',
        'gdscript',
        'gdshader',
        'gherkin',
        'git-commit',
        'git-rebase',
        'glimmer-js', 'gjs',
        'glimmer-ts', 'gts',
        'glsl',
        'gnuplot',
        'go',
        'graphql',
        'groovy',
        'hack',
        'haml',
        'handlebars', 'hbs',
        'haskell', 'hs',
        'hcl',
        'hjson',
        'hlsl',
        'html',
        'http',
        'imba',
        'ini', 'properties',
        'java',
        'javascript', 'js',
        'jinja-html',
        'jison',
        'json',
        'json5',
        'jsonc',
        'jsonl',
        'jsonnet',
        'jssm', 'fsl',
        'jsx',
        'julia',
        'kotlin',
        'kusto', 'kql',
        'latex',
        'less',
        'liquid',
        'lisp',
        'logo',
        'lua',
        'make', 'makefile',
        'markdown', 'md',
        'marko',
        'matlab',
        'mdx',
        'mermaid',
        'narrat', 'nar',
        'nextflow', 'nf',
        'nginx',
        'nim',
        'nix',
        'objective-c', 'objc',
        'objective-cpp',
        'ocaml',
        'pascal',
        'perl',
        'php',
        'plsql',
        'postcss',
        'powerquery',
        'powershell', 'ps', 'ps1',
        'prisma',
        'prolog',
        'proto',
        'pug', 'jade',
        'puppet',
        'purescript',
        'python', 'py',
        'r',
        'raku', 'perl6',
        'razor',
        'reg',
        'rel',
        'riscv',
        'rst',
        'ruby', 'rb',
        'rust', 'rs',
        'sas',
        'sass',
        'scala',
        'scheme',
        'scss',
        'shaderlab', 'shader',
        'shellscript', 'bash', 'sh', 'shell', 'zsh',
        'console',
        'smalltalk',
        'solidity',
        'sparql',
        'sql',
        'ssh-config',
        'stata',
        'stylus', 'styl',
        'svelte',
        'swift',
        'system-verilog',
        'tasl',
        'tcl',
        'tex',
        'toml',
        'tsx',
        'turtle',
        'twig',
        'typescript', 'ts',
        'v',
        'vb', 'cmd',
        'verilog',
        'vhdl',
        'viml', 'vim', 'vimscript',
        'vue-html',
        'vue',
        'vyper', 'vy',
        'wasm',
        'wenyan', '文言',
        'wgsl',
        'wolfram',
        'xml',
        'xsl',
        'yaml', 'yml',
        'zenscript'],
    },
  },
})
