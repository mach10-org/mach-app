import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { defineStore, acceptHMRUpdate } from 'pinia'

interface State {
  isLoading: boolean
  list: Record<string, Pick<ParsedContent, string>[]>
}

export const useBlogStore = defineStore('blog', {
  state: (): State => ({
    isLoading: true,
    list: {},
  }),
  getters: {
    getBlog (state) {
      const { locale } = useI18n()

      if (!state.list[locale.value]) {
        return []
      }
      const dayjs = useDayjs()

      return state.list[locale.value].map(l => ({ ...l, date: dayjs(l.date) })).sort((a, b) => a.date.isBefore(b.date))
    },
  },
  actions: {
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
}
