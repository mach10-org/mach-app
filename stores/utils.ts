import { defineStore, acceptHMRUpdate } from 'pinia'
import type { GlobalThemeOverrides } from 'naive-ui/lib/config-provider'

interface State {
  themeOverrides: GlobalThemeOverrides | undefined
}

export const useUtilsStore = defineStore('utils', {
  state: (): State => ({
    themeOverrides: undefined,
  }),
  getters: {
  },
  actions: {
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUtilsStore, import.meta.hot))
}
