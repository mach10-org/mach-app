<template>
  <div>
    <div class="flex flex-col items-center px-2 py-8 md:px-0">
      <h1 class="max-w-7xl pb-4 text-center text-4xl leading-none tracking-tight super-text-gradient lg:text-6xl md:text-5xl">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h1>
      <p class="mb-6 max-w-2xl text-center font-light lg:mb-8 lg:text-xl md:text-lg">
        <ContentSlot :use="$slots.description" unwrap="p" />
      </p>
      <ul class="grid mt-10 max-w-3xl gap-4 p-0 md:grid-cols-2 lg:mt-13 md:gap-11">
        <BlogCard
          v-for="b in blog.getBlog"
          :key="b._path"
          :title="b.title ?? ''"
          :description="b.description"
          :href="buildHref(b._path ?? '')"
          :preview="b.preview"
          :date="b.date"
          :tags="b.tags"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '~/stores/blog'

const localePath = useLocalePath()
const blog = useBlogStore()

const isLoading = computed(() => blog.isLoading)
await until(isLoading).toBe(false)

const buildHref = (path: string) => {
  return localePath(getPathWithoutLocale(path))
}
</script>
