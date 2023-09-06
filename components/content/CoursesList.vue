<template>
  <div>
    <div class="flex flex-col items-center px-2 py-8 md:px-0">
      <nuxt-link :to="localePath('/stay-up-to-date')" class="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 bg-opacity-10 px-1 py-1 pr-4 text-sm text-$text-base transition-colors hover:bg-opacity-15" role="alert">
        <span class="mr-3 rounded-full bg-$primary px-4 py-1.5 text-xs text-white">
          <ContentSlot :use="$slots.updatesTitle" unwrap="p" />
        </span>
        <span class="text-sm font-medium">
          <ContentSlot :use="$slots.updatesDescription" unwrap="p" />
        </span>
        <svg class="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
      </nuxt-link>
      <h1 class="mb-4 max-w-7xl text-center text-4xl font-extrabold leading-none tracking-tight text-$text-title lg:text-6xl md:text-5xl">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h1>
      <p class="mb-6 max-w-2xl text-center font-light lg:mb-8 lg:text-xl md:text-lg">
        <ContentSlot :use="$slots.description" unwrap="p" />
      </p>
      <ul class="grid mt-10 max-w-3xl gap-4 p-0 md:grid-cols-2 lg:mt-13 md:gap-11">
        <CoursesCard
          v-for="course in courses.getCourses"
          :key="course._path"
          :title="course.title ?? ''"
          :description="course.description"
          :href="buildHref(course._path ?? '')"
          :preview="course.preview"
          :total-hours="course.totalHours"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/stores/course'
import { indexFile } from '~/utils/course'

const localePath = useLocalePath()
const courses = useCourseStore()

const isLoading = computed(() => courses.isLoading)
await until(isLoading).toBe(false)

const buildHref = (path: string) => {
  return localePath(getPathWithoutLocale(path).replace(indexFile, ''))
}
</script>
