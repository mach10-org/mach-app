<template>
  <li>
    <nuxt-link
      :to="href"
      class="link group h-full flex flex-col overflow-hidden border border-$border-input rounded bg-$background-base no-underline drop-shadow-lg transition transition duration-500 hover:drop-shadow-2xl"
    >
      <nuxt-img class="h-[223px] w-full object-cover" :src="`/img/${preview}`" alt="" sizes="xs:100vw sm:100vw md:100vw lg:360px" />
      <div class="flex flex-1 flex-col px-4 py-3">
        <h2 class="mb-1 text-xl font-extrabold text-$link transition-colors lg:text-2xl group-hover:text-$link-hover">
          {{ title }}
        </h2>
        <p class="text-text-base m-0 flex-1 leading-6 transition-colors">
          {{ description }}
        </p>
        <span v-if="totalHours" class="text-text-muted mt-2 block text-sm transition-colors">
          {{ totalHours }} hours
        </span>
      </div>
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
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
  totalHours: {
    type: Number,
    default: null,
  },
})
</script>
