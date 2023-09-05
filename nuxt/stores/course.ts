import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { Database } from '~/types/database.types'

type learningLessonRows = Database['public']['Tables']['learning_lesson']['Row']
interface State {
  isLoading: boolean
  list: Record<string, Pick<ParsedContent, string>[]>
  learningLessons: Omit<learningLessonRows, 'created_at' | 'user_id' | 'updated_at'>[]
}

export const useCourseStore = defineStore('course', {
  state: (): State => ({
    isLoading: true,
    list: {},
    learningLessons: [],
  }),
  getters: {
    getCourses (state) {
      const { locale } = useI18n()

      if (!state.list[locale.value]) {
        return []
      }

      return state.list[locale.value].filter(l => l._path.endsWith(indexFile)).sort((a, b) => a.order - b.order)
    },
    getLessonsByCourse (state) {
      const { locale } = useI18n()
      const courses: Record<string, Pick<ParsedContent, string>[]> = {}

      this.getCourses.forEach((element) => {
        if (!state.list[locale.value]) {
          courses[element._dir] = []
        } else {
          courses[element._dir] = state.list[locale.value].filter(l => l._path.startsWith(`/${locale.value}/courses/${element._dir}/`) && !l._path.endsWith(indexFile))
        }
      })

      return courses
    },
    getLearningLessonsByCourse (state) {
      const courses: Record<string, string[]> = {}

      state.learningLessons.forEach((element) => {
        if (!courses[element.slug_course]) {
          courses[element.slug_course] = []
        }

        courses[element.slug_course].push(element.slug)
      })

      return courses
    },
  },
  actions: {
    async setLessonLearned (course: string, lesson: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        const { data, error } = await supabase.from('learning_lesson').upsert({
          user_id: user.value.id,
          slug: lesson,
          slug_course: course,
        }).select('slug, slug_course').single()

        if (error) {
          throw error
        }

        const index = this.learningLessons.findIndex(l => l.slug === lesson && l.slug_course === course)

        if (index === -1) {
          if (data) {
            this.learningLessons.push(data)
          }
        }

        return true
      } catch (error) {
        const discreteApi = useDiscreteApi()
        console.error(error)
        discreteApi.message.error('Error while saving the lesson status')
      }

      return false
    },
    async setLessonNotFinished (course: string, lesson: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        this.learningLessons = this.learningLessons.filter(l => !(l.slug === lesson && l.slug_course === course))

        const { error } = await supabase.from('learning_lesson').delete().match({
          user_id: user.value.id,
          slug: lesson,
          slug_course: course,
        })

        if (error) {
          throw error
        }

        return true
      } catch (error) {
        this.learningLessons.push({ slug: lesson, slug_course: course })
        const discreteApi = useDiscreteApi()
        console.error(error)
        discreteApi.message.error('Error while saving the lesson status')
      }

      return false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCourseStore, import.meta.hot))
}
