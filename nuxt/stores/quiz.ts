import { defineStore, acceptHMRUpdate } from 'pinia'
import { useProfileStore } from './profile'
import { Database } from '~/types/database.types'

type answersRows = Database['public']['Tables']['answers']['Row']
interface State {
  answers: Omit<answersRows, 'created_at' | 'user_id' | 'updated_at'>[]
}

export const useQuizStore = defineStore('quiz', {
  state: (): State => ({
    answers: [],
  }),
  getters: {
  },
  actions: {
    async saveAnswer (course: string, slug: string, isCorrect: boolean, label: string, xp: number) {
      const supabase = useSupabaseClient<Database>()
      const user = useSupabaseUser()

      try {
        const { error } = await supabase.from('answers').insert({
          user_id: user.value ? user.value.id : undefined,
          slug,
          slug_course: course,
          is_correct: isCorrect,
          label,
        })

        this.answers.push({
          id: 'fake',
          slug,
          slug_course: course,
          is_correct: isCorrect,
          label,
        })

        if (user.value && isCorrect) {
          const profile = useProfileStore()
          await profile.incrementXP(xp)
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
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot))
}
