import { defineStore, acceptHMRUpdate } from 'pinia'
import { Database } from '~/types/database.types'

type answersRows = Database['public']['Tables']['answers']['Row']
interface State {
  answers: Omit<answersRows, 'created_at' | 'user_id' | 'updated_at'>[]
}

export const useQuizzStore = defineStore('quizz', {
  state: (): State => ({
    answers: [],
  }),
  getters: {
  },
  actions: {
    async saveAnswer (course: string, slug: string, isCorrect: boolean, label: string) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        const { data, error } = await supabase.from('answers').upsert({
          user_id: user.value.id,
          slug,
          slug_course: course,
          is_correct: isCorrect,
          label,
        }).select('id, slug, slug_course, label, is_correct').single()

        // TODO if correct increase xp

        // const index = this.learningLessons.findIndex(l => l.slug === lesson && l.slug_course === course)

        // if (index === -1) {
        //   if (data) {
        //     this.learningLessons.push(data)
        //   }
        // }

        return true
      } catch (error) {
        // TODO handle error
      }

      return false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizzStore, import.meta.hot))
}
