<template>
  <div class="mx-auto mt-4 min-h-[60vh] max-w-screen-lg bg-$background-base p-4 lg:mt-8 lg:p-6">
    <h1 class="mb-4 text-center text-2xl lg:mb-8 md:text-4xl">
      <span class="from-purple-400 to-pink-600 bg-gradient-to-r bg-clip-text font-extrabold text-transparent">{{ $t('pages.journey.title') }}</span>
    </h1>

    <ClientOnly>
      <div class="space-y-12">
        <template v-if="courseEnrolled.length > 0">
          <JourneySummary :courses="courseEnrolled.length" :lessons-completed="lessonsCompleted" />
          <JourneyProgress :percentage="percentageTotalCompleted" :done="lessonsCompleted" :total="totalLessons" />
          <div class="space-y-6">
            <JourneyDetail v-for="c in courseEnrolled" :key="c" :slug="c" />
          </div>
        </template>
        <div v-else class="mt-24 flex flex-col justify-center">
          <p class="mb-4 text-center text-xl font-medium lg:text-2xl">
            {{ $t('pages.journey.notEnrolled') }}
          </p>
          <div class="m-0 text-center text-base leading-6">
            <ButtonLink size="large" :to="localePath('/courses')">
              {{ $t('pages.journey.notEnrolledCTA') }}
            </ButtonLink>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/stores/course'

const course = useCourseStore()
const localePath = useLocalePath()

definePageMeta({
  middleware: 'auth',
})

const courseEnrolled = computed(() => Object.keys(course.getLearningLessonsByCourse))
const lessonsCompleted = computed(() => course.learningLessons.length)
const totalLessons = computed(() => {
  return Object.keys(course.getLessonsByCourseWithoutSection).reduce((acc, key) => {
    if (courseEnrolled.value.includes(key)) {
      acc += course.getLessonsByCourseWithoutSection[key].length
    }
    return acc
  }, 0)
})
const percentageTotalCompleted = computed(() => ((lessonsCompleted.value / totalLessons.value) * 100).toFixed(2))
</script>
