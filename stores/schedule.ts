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
      const dayjs = useDayjs()

      let duration = dayjs.duration(0)

      state.list.forEach((l) => {
        const start = dayjs(l.start, 'HH:mm')
        const end = dayjs(l.end, 'HH:mm')

        duration = duration.add(end.diff(start))
      })

      return duration.asHours()
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

        const { data, error } = await supabase.from('schedule').insert(list.map(l => ({
          ...l,
          // @ts-ignore
          user_id: user.value.id,
        }))).select('day_start, start, day_end, end')

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
