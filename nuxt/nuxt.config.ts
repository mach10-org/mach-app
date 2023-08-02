// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-font-loader',
    '@nuxtjs/supabase',
    '@nuxt/content',
  ],

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
})
