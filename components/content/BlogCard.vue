<template>
  <li>
    <nuxt-link
      :to="href"
      class="group h-full flex flex-col overflow-hidden border border-$border-input rounded bg-$background-base no-underline drop-shadow-lg transition duration-500 hover:drop-shadow-2xl"
    >
      <nuxt-img class="h-[223px] w-full object-cover dark:opacity-70" :src="`/img/${preview}`" alt="" sizes="xs:100vw sm:100vw md:100vw lg:360px" />
      <div class="flex flex-1 flex-col px-4 py-3">
        <div v-if="tags" class="mb-3 space-x-2">
          <n-tag v-for="tag in tags" :key="tag" :bordered="false" round type="info">
            {{ tag }}
          </n-tag>
        </div>
        <h2 class="mb-1 text-xl font-extrabold text-$link underline transition-colors duration-500 lg:text-2xl group-hover:(text-$link-hover no-underline)">
          {{ title }}
        </h2>
        <p class="m-0 flex-1 text-base leading-6 text-$text-base">
          {{ description }}
        </p>
        <span class="mt-2 block text-sm text-$text-muted">
          {{ date.format('YYYY-MM-DD') }}
        </span>
      </div>
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
import { Dayjs } from 'dayjs'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  tags: {
    type: Array as () => string[],
    default: null,
  },
  date: {
    type: Object as () => Dayjs,
    required: true,
  },
})
</script>
