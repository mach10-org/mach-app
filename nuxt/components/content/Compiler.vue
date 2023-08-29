<template>
  <div>
    <div v-show="!isHidden" ref="initialState">
      <slot />
    </div>
    <CompilerTerminal :initial-state="htmlToFormattedText(initialState?.innerHTML)" :title="title" />
  </div>
</template>

<script setup lang="ts">
import htmlToFormattedText from 'html-to-formatted-text'

interface Props {
  title?: string
}
defineProps<Props>()

const initialState = ref<HTMLDivElement | null>(null)
const isHidden = ref(false)

onMounted(() => {
  isHidden.value = true
})
</script>
