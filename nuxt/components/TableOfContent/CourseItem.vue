<template>
  <li class="flex items-center">
    <span class="h-[1.9em] w-[1.9em] flex items-center justify-center border border-$border-input rounded-full text-[0.8em]" aria-hidden="true">{{ index + 1 }}</span>
    <nuxt-link :to="localePath(getPathWithoutLocale(path))" class="link ml-[0.5em] min-w-0" :class="{'opacity-75 hover:opacity-100': isLearned}">
      <slot />
    </nuxt-link>
    <Icon v-if="isLearned" name="heroicons:shield-check-20-solid" class="ml-2 h-[1.2em] w-[1.2em]" />
  </li>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/stores/course'

interface Props {
  index: number
  path: string
  courseSlug: string
}
const props = defineProps<Props>()

const localePath = useLocalePath()
const course = useCourseStore()

const learningLessons = computed(() => course.getLearningLessonsByCourse[props.courseSlug] ?? [])
const isLearned = computed(() => learningLessons.value.findIndex(l => props.path.endsWith(l.slug)) !== -1)
</script>
