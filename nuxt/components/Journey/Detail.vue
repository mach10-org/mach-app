<template>
  <div v-if="course" class="border border-$border-input rounded">
    <div :id="course._dir + '-heading'" class="group h-16 w-full flex cursor-pointer items-center rounded-2xl bg-$background-base px-4" @click="isOpen = !isOpen">
      <div class="w-1/3 flex items-center gap-4">
        <!-- <DynamicDevIcon :name="iconName" style="normal" class="hidden sm:flex" /> -->
        <span class="truncate text-base text-$text-title">{{ course.title }}</span>
      </div>

      <div class="flex grow items-center pl-2">
        <div class="h-2.5 w-full rounded-full bg-$border-input transition-height duration-200 group-hover:h-4">
          <div class="h-full rounded-full from-purple-400 to-pink-600 bg-gradient-to-r" :style="{ width: percentage + '%' }" />
        </div>
        <span class="mx-8 w-24 text-right font-bold">{{ percentage.toFixed(0) }}%</span>
      </div>

      <span
        class="ml-auto shrink-0 transform text-$link transition-all duration-200"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen
        }"
      >
        <Icon name="heroicons:chevron-down" class="h-6 w-6" />
      </span>
    </div>
    <div v-show="isOpen" :id="'#' + course._dir + '-body'" :aria-labelledby="course._dir + '-heading'" class="mx-auto px-6 pb-6 md:grid-cols-2" :class="{ grid: isOpen }">
      <div class="flex flex-col items-center justify-center border-b border-$border-input py-4 md:border-b-0 md:border-r">
        <Icon name="heroicons:chart-bar-20-solid" class="mb-1 h-10 w-10 text-$text-muted" />
        <h4 class="text-2xl font-medium text-$text-title">
          {{ $t('pages.journey.detail_lastWeeks') }}
        </h4>
        <p class="text-center">
          <strong>{{ qtyLastWeeks }} / {{ lessons.length }} ({{ ((qtyLastWeeks / lessons.length) * 100).toFixed(0) }}%)</strong>
          <span class="ml-1 text-$text-muted">{{ $t('pages.journey.detail_completed') }}</span>
        </p>
      </div>
      <div class="flex flex-col items-center justify-center py-4">
        <Icon name="heroicons:arrow-left-on-rectangle-20-solid" class="mb-1 h-10 w-10 text-$text-muted" />
        <h4 class="text-center text-2xl font-medium leading-7">
          {{ lessonsLearned[0].created_at.format('LL') }}
        </h4>
        <p class="text-center text-$text-muted">
          {{ $t('pages.journey.detail_dateStart') }}
        </p>
      </div>
      <div class="col-span-2 pt-4 text-center text-base">
        <NuxtLinkLocale :to="`/courses/${slug}/`" class="link">
          {{ $t('pages.journey.detail_goToCourse') }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCourseStore } from '~/stores/course'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const courses = useCourseStore()
const dayjs = useDayjs()

const course = computed(() => courses.getCourses.find(c => c._path.endsWith(`${props.slug}/${indexFile}`)))
const lessons = computed(() => courses.getLessonsByCourseWithoutSection[props.slug])
const lessonsLearned = computed(() => courses.getLearningLessonsByCourse[props.slug])

const periodStart = dayjs().subtract(2, 'weeks').startOf('day')

const qtyLastWeeks = computed(() => {
  const lessons = lessonsLearned.value.filter(l => l.created_at.isSameOrAfter(periodStart))
  return lessons.length
})

const percentage = computed(() => (lessonsLearned.value.length / lessons.value.length) * 100)
// const iconName = computed(() => {
//   let name = 'dev'
//   switch (props.course._dir) {
//     case 'golang-book':
//       name = 'go'
//       break
//     case 'dotnet':
//       name = 'go'
//       break
//     default:
//       name = 'dev'
//       break
//   }
//   return name
// })

const isOpen = ref(false)
</script>
