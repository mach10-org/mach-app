import { defineStore, acceptHMRUpdate } from 'pinia'
import { Database } from 'types/database.types'

type learningLessonRows = Database['public']['Tables']['learning_lesson']['Row']
interface State {
  isLoading: boolean
  learningLessons: Omit<learningLessonRows, 'created_at' | 'user_id'>[]
}

export const useCourseStore = defineStore('course', {
  state: (): State => ({
    isLoading: true,
    learningLessons: [],
  }),
  getters: {
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

        if (data) {
          this.learningLessons.push(data)
        }

        return true
      } catch (error) {
        // TODO handle error
      }

      return false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCourseStore, import.meta.hot))
}
