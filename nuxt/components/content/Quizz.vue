<template>
  <aside class="my-6 w-full flex flex-col border border-$border-input rounded-lg bg-$background-body px-6 py-5 shadow">
    <h4 class="mb-4 mt-0">
      {{ title }}
    </h4>
    <n-radio-group v-model:value="value" name="radiogroup" class="pl-1">
      <n-grid :y-gap="10" :cols="1">
        <n-gi
          v-for="(a, index) in answers"
          :key="index"
        >
          <n-radio
            :value="index"
            :label="a.label"
            size="large"
          />
        </n-gi>
      </n-grid>
    </n-radio-group>
    <div v-if="!isAnswerCorrect" class="grid grid-cols-2 mt-4 gap-10">
      <n-button
        class=""
        size="large"
        type="primary"
        :disabled="!canSubmit"
        @click="submit"
      >
        {{ $t('common.submit') }}
      </n-button>

      <div class="not-prose flex flex-col items-end justify-center text-sm">
        <p>{{ $t('quiz.plus_xp', {xp}) }}</p>
        <p v-if="!user">
          <nuxt-link :to="localePath('/login')" class="link">
            {{ $t('quiz.signup_text1') }}
          </nuxt-link> {{ $t('quiz.signup_text2') }}
        </p>
      </div>
    </div>
    <div v-if="answerIndex" class="mt-6">
      <n-alert v-if="isAnswerCorrect" :title="$t('quiz.correct')" type="success">
        {{ answers[answerIndex].explanation }}
      </n-alert>
      <n-alert v-else :title="$t('quiz.incorrect')" type="error">
        {{ answers[answerIndex].explanation }}
      </n-alert>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useQuizStore } from '~/stores/quiz'

interface Props {
  title: string
  slug: string
  xp: number
  answers: Array<{
    label: string
    explanation: string
    isCorrect?: boolean
  }>
}

const props = defineProps<Props>()

const quiz = useQuizStore()
const route = useRoute()
const user = useSupabaseUser()
const localePath = useLocalePath()

const answerIndex = computed(() => {
  const answer = quiz.answers.findLast(a => a.slug === props.slug && a.slug_course === route.params.slug.toString())
  if (answer) {
    const index = props.answers.findIndex(a => a.label === answer.label)
    if (index !== -1) {
      return index
    }
  }
  return null
})

const isAnswerCorrect = computed(() => {
  if (answerIndex.value !== null) {
    return props.answers[answerIndex.value].isCorrect ?? false
  }
  return false
})

const value = ref<number | null>(answerIndex.value)
const isLoading = ref(false)

// If we selected an answer and the answer already given is not the good one
const canSubmit = computed(() => {
  return value.value !== null && (answerIndex.value ? !props.answers[answerIndex.value].isCorrect : true)
})

const submit = async () => {
  if (value.value === null) {
    return
  }

  isLoading.value = true

  const answer = props.answers[value.value]
  await quiz.saveAnswer(route.params.slug.toString(), props.slug, answer.isCorrect ?? false, answer.label, props.xp)

  isLoading.value = false
}
</script>
