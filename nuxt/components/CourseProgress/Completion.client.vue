<template>
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
</template>

<script setup lang="ts">
import { useCourseStore } from '~/stores/course'

interface Props {
  courseSlug: string
  activeLesson: string | string[]
}

const props = defineProps<Props>()
const course = useCourseStore()
const { locale } = useI18n()

const activeLessonComputed = computed(() => Array.isArray(props.activeLesson) ? props.activeLesson.join('/') : props.activeLesson)
const learningLessons = computed(() => course.learningLessonsByCourse[props.courseSlug] ?? [])
const isActiveLessonLearned = computed(() => learningLessons.value.findIndex(l => activeLessonComputed.value.endsWith(l)) !== -1)

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
        course.setLessonNotFinished(props.courseSlug, activeLessonComputed.value)
      },
    },
  }])
</script>
