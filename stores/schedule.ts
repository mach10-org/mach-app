import { defineStore, acceptHMRUpdate } from 'pinia'
import { Database } from '~/types/database.types'

type scheduleRows = Database['public']['Tables']['schedule']['Row']

interface State {
  list: Omit<scheduleRows, 'created_at' | 'user_id' | 'id'>[]
}

export const useScheduleStore = defineStore('schedule', {
  state: (): State => ({
    list: [],
  }),
  getters: {
    weeklyGoal (state) {
      // TODO
      return 5
    },
  },
  actions: {
    async save (list: State['list']) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        // Reset list
        const { error: errorDelete } = await supabase.from('schedule').delete().eq('user_id', user.value.id)

        if (errorDelete) {
          throw errorDelete
        }

        const { data, error } = await supabase.from('schedule').insert(list.map(l => ({ ...l, user_id: user.value.id }))).select('day, start, end')

        if (error) {
          throw error
        }

        this.list = data ?? []

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while saving the schedule')
      }

      return false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScheduleStore, import.meta.hot))
}
