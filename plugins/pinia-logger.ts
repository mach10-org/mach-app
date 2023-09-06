import { PiniaPluginContext } from 'pinia'

function PiniaLogger ({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // react to store changes
    console.log(`[🍍 mutation][${mutation.storeId}] ${mutation.type}`)
  })
  store.$onAction((context) => {
    // react to store actions
    console.log(`[🍍 action][${context.store.$id}.${context.name}]`)
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$config.platform !== 'prod') {
    nuxtApp.vueApp.$nuxt.$pinia.use(PiniaLogger)
  }
})
