import { defineStore, acceptHMRUpdate } from 'pinia'
import { Database } from 'types/database.types'

type rows = Database['public']['Tables']['profiles']['Row']
interface State extends Omit<rows, 'id' | 'updated_at'> {
}

export const useProfileStore = defineStore('profile', {
  state: (): State => ({
    about: null,
    age: null,
    avatar_url: null,
    computer_xp: null,
    devices: null,
    dob: null,
    education: null,
    full_name: null,
    gender: null,
    goal: [],
    username: null,
    xp: 0,
  }),
  getters: {
  },
  actions: {
    async fetch () {
      const supabase = useSupabaseClient<Database>()
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*').single()

        this.about = profile?.about ?? null
        this.age = profile?.age ?? null
        this.avatar_url = profile?.avatar_url ?? null
        this.computer_xp = profile?.computer_xp ?? null
        this.devices = profile?.devices ?? null
        this.dob = profile?.dob ?? null
        this.education = profile?.education ?? null
        this.full_name = profile?.full_name ?? null
        this.gender = profile?.gender ?? null
        this.goal = profile?.goal ?? []
        this.username = profile?.username ?? null
        this.xp = profile?.xp ?? 0
      } catch (error) {
        // TODO handle error
      }
    },
    reset () {
      this.about = null
      this.age = null
      this.avatar_url = null
      this.computer_xp = null
      this.devices = null
      this.dob = null
      this.education = null
      this.full_name = null
      this.gender = null
      this.goal = []
      this.username = null
      this.xp = 0
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}
