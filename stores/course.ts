import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { Dayjs } from 'dayjs'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useProfileStore } from './profile'
import { Database } from '~/types/database.types'
import { sectionFile } from '~/utils/course'

type learningLessonRows = Database['public']['Tables']['learning_lesson']['Row']
interface State {
  isLoading: boolean
  list: Record<string, Pick<ParsedContent, string>[]>
  learningLessons: Omit<learningLessonRows, 'user_id' | 'updated_at'>[]
}

const xpPerFinishedLesson = 1
const xpPerFinishedCourse = 50
const xpPerCourseHour = 1

const getXpForCourse = (hours: number) => {
  return xpPerFinishedCourse + (hours * xpPerCourseHour)
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

      const config = useRuntimeConfig()

      return state.list[locale.value].filter(l => l._path.endsWith(indexFile)).sort((a, b) => a.order - b.order).map((c) => {
        if (c.isComingSoon && config.public.platform === 'prod') {
          return {
            ...c,
            _path: '/stay-up-to-date',
            preview: 'coming-soon.jpg',
            totalHours: 0,
          }
        }

        return c
      })
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
    getLessonsByCourseWithoutSection () {
      const courses: Record<string, Pick<ParsedContent, string>[]> = { ...this.getLessonsByCourse }

      Object.keys(courses).forEach((key) => {
        courses[key] = courses[key].filter(l => !l._path.endsWith(sectionFile))
      })

      return courses
    },
    getLearningLessonsByCourse (state) {
      const dayjs = useDayjs()
      const courses: Record<string, Array<{
        slug: string
        created_at: Dayjs
      }>> = {}

      state.learningLessons.forEach((element) => {
        if (!courses[element.slug_course]) {
          courses[element.slug_course] = []
        }

        courses[element.slug_course].push({
          slug: element.slug,
          created_at: dayjs(element.created_at),
        })
      })

      return courses
    },
    isCourseFinished () {
      const courses = this.getLearningLessonsByCourse

      return (course: string) => {
        if (!courses[course]) {
          return false
        }

        const lessons = courses[course]

        return lessons.length === this.getLessonsByCourseWithoutSection[course].length
      }
    },
  },
  actions: {
    async setLessonLearned (course: string, lesson: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()
      const profile = useProfileStore()

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

          if (this.isCourseFinished(course)) {
            profile.incrementXP(getXpForCourse(this.getCourses.find(c => c._dir === course)?.totalHours ?? 0) + xpPerFinishedLesson)
          } else {
            profile.incrementXP(xpPerFinishedLesson)
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
      const profile = useProfileStore()

      try {
        const wasCourseFinished = this.isCourseFinished(course)

        this.learningLessons = this.learningLessons.filter(l => !(l.slug === lesson && l.slug_course === course))

        const { error } = await supabase.from('learning_lesson').delete().match({
          user_id: user.value.id,
          slug: lesson,
          slug_course: course,
        })

        if (error) {
          throw error
        }

        if (wasCourseFinished) {
          profile.decrementXP(getXpForCourse(this.getCourses.find(c => c._dir === course)?.totalHours ?? 0))
        } else {
          profile.decrementXP(xpPerFinishedLesson)
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
