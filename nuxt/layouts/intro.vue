<template>
  <main :class="{'lg:space-y-10': !hasHeader}">
    <template v-if="hasHeader">
      <header class="relative h-[360px] w-full md:h-[460px] xl:h-[537px]">
        <nuxt-img
          v-if="preview"
          :src="preview"
          class="absolute left-0 top-0 h-full w-full w-full object-cover -z-1"
          densities="x1 x2"
        />
        <div class="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50" />
        <div class="absolute left-1/2 top-20 mx-auto w-full max-w-screen-xl px-4 xl:top-1/2 -translate-x-1/2 xl:px-0 xl:-translate-y-1/2">
          <h1 class="mb-4 max-w-4xl text-2xl font-extrabold leading-none text-white lg:text-4xl sm:text-3xl">
            {{ title }}
          </h1>
          <p class="text-lg font-normal text-gray-300">
            {{ description }}
          </p>
        </div>
      </header>
      <div class="relative z-20 mx-4 mb-8 max-w-screen-xl flex justify-between rounded bg-$background-base p-6 xl:mx-auto -mt-36 xl:p-9 xl:-mt-32">
        <div class="article max-w-none flex-1 text-lg prose">
          <slot />
        </div>
        <!-- {showTOC && (
        <div class="hidden w-[340px] pl-10 lg:block">
          <TOC page-headings="{headings}" max-depth="{2}" classes="sticky top-[20px] bg-$background-base w-full" />
        </div>
        )} -->
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </main>
</template>

<script setup lang="ts">
defineProps({
  hasHeader: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  preview: {
    type: String,
    default: '',
  },
})
</script>
