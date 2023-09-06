<template>
  <TitleDescription :is-centered="true" :class="{'mb-16 sm:px-8 lg:px-32 xl:px-64': hasPadding}">
    <template #title>
      <ContentSlot :use="$slots.title" unwrap="p" />
    </template>
    <template #description>
      <slot name="description" />
    </template>

    <div class="mt-8 md:grid lg:grid-cols-3 md:grid-cols-2 lg:mt-12 md:gap-12 space-y-8 md:space-y-0">
      <slot />
    </div>
  </TitleDescription>
</template>

<script setup lang="ts">
interface Props {
  hasPadding?: boolean
}
defineProps<Props>()
</script>
