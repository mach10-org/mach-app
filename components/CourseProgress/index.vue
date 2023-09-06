<template>
  <div class="pb-8 pt-10">
    <div class="h-16 flex flex-wrap items-center rounded-2xl bg-$background-base px-4 lg:px-8">
      <nuxt-link :to="localePath(`/courses/${courseSlug}`)" class="link mr-6 inline-flex items-center text-base">
        <Icon name="heroicons:arrow-left-solid" class="mr-1" />
        {{ title }}
      </nuxt-link>

      <CourseProgressCompletion :course-slug="courseSlug" :active-lesson="activeLesson" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  courseSlug: string
  activeLesson: string | string[]
  title: string
}
defineProps<Props>()
const localePath = useLocalePath()
</script>
