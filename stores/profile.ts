import { defineStore, acceptHMRUpdate } from 'pinia'
import { Dayjs } from 'dayjs'
import { useCourseStore } from './course'
import { useQuizStore } from './quiz'
import { useScheduleStore } from './schedule'
import { Database } from '~/types/database.types'

interface LastCoursePage {
  url: string
  title: string
  main: boolean
}

type rows = Database['public']['Tables']['profiles']['Row']
interface State extends Omit<rows, 'id' | 'updated_at' | 'created_at'> {
  isLoading: boolean
  lastCoursePage: LastCoursePage | null
  timezone: string
  created_at: Dayjs | null
}

export const machBadges = [
  'Subsonic', 'Transonic', 'Sonic', 'Supersonic', 'Hypersonic', 'Hypervelocity',
]

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
    timezone: '',
    created_at: null,
    has_been_asked_to_set_schedule: false,
    email: '',
  }),
  getters: {
    isOnBoarded (state) {
      return state.full_name !== null
    },
    getMach (state) {
      return state.xp / 100
    },
    getBadge () {
      const mach = this.getMach
      let badge = machBadges[0]

      if (mach >= 10) {
        badge = machBadges[5]
      } else if (mach >= 5) {
        badge = machBadges[4]
      } else if (mach >= 1.3) {
        badge = machBadges[3]
      } else if (mach === 1) {
        badge = machBadges[2]
      } else if (mach >= 0.8) {
        badge = machBadges[1]
      }

      return badge
    },
    getXp () {
      const i18n = useI18n()
      return `Mach ${i18n.n(this.getMach, { maximumFractionDigits: 2 }) || 0} - ${this.getBadge}`
    },
  },
  actions: {
    async fetch () {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      this.isLoading = true

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*, last_url(url, title, main), learning_lesson(slug, slug_course, created_at), answers(id, slug, slug_course, label, is_correct), schedule(day, start, end)').eq('id', user.value.id).maybeSingle()

        if (error) {
          throw error
        }

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
        this.timezone = profile?.timezone ?? ''
        this.has_been_asked_to_set_schedule = profile?.has_been_asked_to_set_schedule ?? false
        this.email = profile?.email ?? ''
        if (process.client) {
          const dayjs = useDayjs()
          this.created_at = dayjs.utc(profile?.created_at) ?? null
          this.timezone = profile?.timezone ?? dayjs.tz.guess()
        }

        this.lastCoursePage = (profile?.last_url as unknown as LastCoursePage) ?? null

        const course = useCourseStore()
        course.learningLessons = profile?.learning_lesson ?? []

        const quiz = useQuizStore()
        quiz.answers = profile?.answers ?? []

        const schedule = useScheduleStore()
        schedule.list = profile?.schedule ?? []
      } catch (error) {
        const discreteApi = useDiscreteApi()
        console.error(error)
        discreteApi.message.error('Error while loading the profile')
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
      const discreteApi = useDiscreteApi()
      const dayjs = useDayjs()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        const { data: profile, error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          full_name: firstname,
          goal: goals,
          computer_xp: computerXp,
          devices,
          age,
          timezone: dayjs.tz.guess(),
          email: this.email,
        }).select().single()

        if (error) {
          throw error
        }

        this.age = profile?.age ?? null
        this.computer_xp = profile?.computer_xp ?? null
        this.devices = profile?.devices ?? null
        this.full_name = profile?.full_name ?? null
        this.goal = profile?.goal ?? []

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while saving the onboarding')
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
      const discreteApi = useDiscreteApi()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

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
          email: this.email,
        }).select().single()

        if (error) {
          throw error
        }

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
        console.error(error)
        discreteApi.message.error('Error while saving the profile')
      }

      return false
    },
    async saveLastCoursePage (url: string, title: string, courseTitle: string, main = false) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        const { data, error } = await supabase.from('last_url').upsert({
          id: user.value.id,
          url,
          title,
          main,
          course_title: courseTitle,
        }).select('url, title, main').single()

        if (error) {
          throw error
        }

        this.lastCoursePage = data ?? null

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while saving the last page')
      }

      return false
    },
    async saveTimezone (timezone: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        const { data, error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          timezone,
          email: this.email,
        }).select('timezone').single()

        if (error) {
          throw error
        }

        const dayjs = useDayjs()
        this.timezone = data.timezone ?? dayjs.tz.guess()

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while saving the timezone')
      }

      return false
    },
    async setAskedToSetSchedule () {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        const { data, error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          has_been_asked_to_set_schedule: true,
          email: this.email,
        }).select('has_been_asked_to_set_schedule').single()

        if (error) {
          throw error
        }

        this.has_been_asked_to_set_schedule = data.has_been_asked_to_set_schedule ?? false

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while saving the profile')
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
      this.has_been_asked_to_set_schedule = false
      this.email = ''
      const dayjs = useDayjs()
      this.timezone = dayjs.tz.guess()

      const course = useCourseStore()
      course.learningLessons = []
    },
    async incrementXP (value: number) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      // TODO function? https://stackoverflow.com/questions/76192402/supabase-update-with-incrementing-value

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        const { error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          xp: this.xp + value,
          email: this.email,
        })

        if (error) {
          throw error
        }

        this.xp += value

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while incrementing the XP')
      }

      return false
    },
    async decrementXP (value: number) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const discreteApi = useDiscreteApi()

      // TODO function? https://stackoverflow.com/questions/76192402/supabase-update-with-incrementing-value

      if (!user.value) {
        discreteApi.message.error('User not logged in')
        return false
      }

      try {
        const { error } = await supabase.from('profiles').upsert({
          id: user.value.id,
          xp: this.xp - value,
          email: this.email,
        })

        if (error) {
          throw error
        }

        this.xp -= value

        return true
      } catch (error) {
        console.error(error)
        discreteApi.message.error('Error while decrementing the XP')
      }

      return false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}
