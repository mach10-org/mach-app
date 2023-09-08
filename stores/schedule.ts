import { defineStore, acceptHMRUpdate } from 'pinia'

interface State {

}

export const useScheduleStore = defineStore('schedule', {
  state: (): State => ({
  }),
  getters: {
    weeklyGoal (state) {
      // TODO
      return 5
    },
  },
  actions: {
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScheduleStore, import.meta.hot))
}
