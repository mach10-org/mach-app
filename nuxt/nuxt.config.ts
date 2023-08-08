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
      trailingSlash: true,
    },
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

  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    detectBrowserLanguage: false,
    trailingSlash: true,
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
    preflight: true,
  },

  naiveui: {
    colorModePreference: 'system',
  },
})
