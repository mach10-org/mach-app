<template>
  <main :class="{'lg:space-y-10': !hasHeader}">
    <template v-if="hasHeader">
      <header class="relative h-[360px] w-full text-[larger] md:h-[460px] xl:h-[537px]">
        <nuxt-img
          v-if="computedPreview"
          :src="computedPreview"
          class="absolute left-0 top-0 h-full w-full w-full object-cover -z-1"
          densities="x1 x2"
        />
        <div v-else class="bg-ctp-latte-surface0 absolute left-0 top-0 h-full w-full dark:bg-ctp-frappe-lavender" />
        <div class="absolute left-0 top-0 h-full w-full bg-ctp-latte-crust bg-opacity-75 dark:(bg-ctp-frappe-crust bg-opacity-85)" />
        <div class="absolute left-1/2 top-20 mx-auto w-full max-w-screen-xl px-4 xl:top-1/2 -translate-x-1/2 xl:px-0 xl:-translate-y-1/2">
          <slot name="header-top" />
          <h1 class="inline-block max-w-4xl pb-4 text-2xl leading-none super-text-gradient lg:text-5xl sm:text-3xl">
            {{ title }}
          </h1>
          <p class="text-lg font-normal text-$text-muted">
            {{ description }}
          </p>
          <slot name="header-bottom" />
        </div>
      </header>
      <div class="relative z-20 mx-4 mb-8 max-w-screen-xl flex justify-between rounded bg-$background-base p-6 xl:mx-auto -mt-36 xl:p-9 xl:-mt-32">
        <div class="article max-w-none flex-1 text-lg prose">
          <slot />
        </div>
        <div v-if="showToc" class="hidden w-[340px] pl-10 lg:block">
          <TableOfContent class="sticky top-[20px] w-full bg-$background-base" :toc-links="tocLinks" />
        </div>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
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
    default: undefined,
  },
  showToc: {
    type: Boolean,
    default: true,
  },
  tocLinks: {
    type: Array,
    required: true,
  },
})

const computedPreview = computed(() => props.preview ? `/img/${props.preview}` : undefined)

useSeoMeta({
  title: () => props.title,
  description: () => props.description,
  ogImage: () => computedPreview.value,
})
</script>
