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
    <n-button
      class="mt-4"
      size="large"
      type="primary"
      :disabled="value === null"
      @click="submit"
    >
      {{ $t('common.submit') }}
    </n-button>
  </aside>
</template>

<script setup lang="ts">
import { useQuizzStore } from '~/stores/quizz'

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

const quizz = useQuizzStore()
const route = useRoute()

const value = ref<number | null>(null)

const submit = () => {
  const answer = props.answers[value.value!]
  quizz.saveAnswer(route.params.slug.toString(), props.slug, answer.isCorrect ?? false, answer.label)

  // TODO: show explanation
}
</script>
