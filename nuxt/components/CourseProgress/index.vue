<template>
  <div class="pb-8 pt-10">
    <div class="h-16 flex flex-wrap items-center rounded-2xl bg-$background-base px-4 lg:px-8">
      <nuxt-link :to="localePath(`/courses/${courseSlug}`)" class="link mr-6 inline-flex items-center text-base">
        <Icon name="heroicons:arrow-left-solid" class="mr-1" />
        {{ title }}
      </nuxt-link>

      <CourseProgressCircle v-if="percentage" :percentage="percentage" />

      <p v-if="percentage" class="text-text-base ml-3 hidden font-medium lg:block md:text-lg">
        Completion
      </p>

      <div v-if="isActiveLessonLearned" class="relative ml-auto flex items-center whitespace-nowrap">
        <Icon name="heroicons:shield-check-20-solid" class="mr-1 h-6 w-6" />
        <span class="hidden font-medium text-$text-base lg:block">Chapter finished</span>

        <n-dropdown
          :trigger="hasTouch ? 'click' : 'hover'"
          placement="bottom-end"
          :options="options"
        >
          <n-button
            title="Open actions menu"
            secondary
            class="ml-4"
          >
            <template #icon>
              <Icon name="heroicons:ellipsis-vertical-20-solid" />
            </template>
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/stores/course'

const props = defineProps({
  courseSlug: {
    type: String,
    required: true,
  },
  activeLesson: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
const localePath = useLocalePath()
const course = useCourseStore()
const { locale } = useI18n()

const learningLessons = computed(() => course.learningLessonsByCourse[props.courseSlug] ?? [])
const isActiveLessonLearned = computed(() => learningLessons.value.findIndex(l => props.activeLesson.endsWith(l)) !== -1)

const hasTouch = useSupported(() => (process.client && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))))

const { data: lessons } = await useAsyncData(`course-${props.courseSlug}-lessons`, () =>
  queryContent(
    locale.value, 'courses', props.courseSlug,
  ).where({ _path: { $not: { $containsAny: ['_dir', indexFile] } } }).only(['_path']).find(),
)

const percentage = computed(() => {
  if (!lessons.value) {
    return 0
  }

  return Math.ceil((learningLessons.value.length / lessons.value.length) * 100)
})

const options = computed(() => [
  {
    label: 'Mark as not finished',
    key: 'not-finished',
    props: {
      onClick: () => {
        course.setLessonNotFinished(props.courseSlug, props.activeLesson)
      },
    },
  }])
</script>
