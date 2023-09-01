import { defineStore, acceptHMRUpdate } from 'pinia'
import { useCourseStore } from './course'
import { useQuizStore } from './quiz'
import { Database } from '~/types/database.types'

interface LastCoursePage {
  url: string
  title: string
  main: boolean
}

type rows = Database['public']['Tables']['profiles']['Row']
interface State extends Omit<rows, 'id' | 'updated_at'> {
  isLoading: boolean
  lastCoursePage: LastCoursePage | null
}

export const useProfileStore = defineStore('profile', {
  state: (): State => ({
    isLoading: true,
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
    lastCoursePage: null,
  }),
  getters: {
    isOnBoarded (state) {
      return state.full_name !== null
    },
    getXp (state) {
      return `Mach ${state.xp || 0}`
    },
  },
  actions: {
    async fetch () {
      const supabase = useSupabaseClient<Database>()

      this.isLoading = true

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*, last_url(url, title, main), learning_lesson(slug, slug_course), answers(id, slug, slug_course, label, is_correct)').single()

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

        this.lastCoursePage = (profile?.last_url as unknown as LastCoursePage) ?? null

        const course = useCourseStore()
        course.learningLessons = profile?.learning_lesson ?? []

        const quiz = useQuizStore()
        quiz.answers = profile?.answers ?? []
      } catch (error) {
        // TODO handle error
      }

      this.isLoading = false
    },
    async saveOnboarding (firstname: string,
      goals: string[],
      computerXp: string,
      devices: string[],
      age: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        const { data: profile, error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          full_name: firstname,
          goal: goals,
          computer_xp: computerXp,
          devices,
          age,
        }).select().single()

        this.age = profile?.age ?? null
        this.computer_xp = profile?.computer_xp ?? null
        this.devices = profile?.devices ?? null
        this.full_name = profile?.full_name ?? null
        this.goal = profile?.goal ?? []

        return true
      } catch (error) {
        // TODO handle error
      }

      return false
    },
    async saveProfile (firstname: string,
      goals: string[],
      computerXp: string,
      devices: string[],
      age: string,
      gender: string,
      education: string,
      about: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        const { data: profile, error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          full_name: firstname,
          goal: goals,
          computer_xp: computerXp,
          devices,
          age,
          gender,
          education,
          about,
        }).select().single()

        this.age = profile?.age ?? null
        this.computer_xp = profile?.computer_xp ?? null
        this.devices = profile?.devices ?? null
        this.full_name = profile?.full_name ?? null
        this.goal = profile?.goal ?? []
        this.gender = profile?.gender ?? null
        this.education = profile?.education ?? null
        this.about = profile?.about ?? null

        return true
      } catch (error) {
        // TODO handle error
      }

      return false
    },
    async saveLastCoursePage (url: string, title: string, main = false) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        const { data, error } = await supabase.from('last_url').upsert({
          id: user.value.id,
          url,
          title,
          main,
        }).select('url, title, main').single()

        this.lastCoursePage = data ?? null

        return true
      } catch (error) {
        // TODO handle error
      }

      return false
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
      this.lastCoursePage = null

      const course = useCourseStore()
      course.learningLessons = []
    },
    async incrementXP (value: number) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      // TODO function? https://stackoverflow.com/questions/76192402/supabase-update-with-incrementing-value

      try {
        const { error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          xp: this.xp + value,
        })

        this.xp += value

        return true
      } catch (error) {
        // TODO handle error
      }

      return false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}
