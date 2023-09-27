export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('i18n:localeSwitched', ({ newLocale }) => {
    const dayjs = nuxtApp.vueApp.$nuxt.$dayjs
    dayjs.locale(newLocale)
  })
})
