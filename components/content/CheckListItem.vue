<template>
  <li class="flex space-x-3" :class="{'items-center': !hasDescription}">
    <svg class="h-5 w-5 flex-shrink-0 text-$primary" :class="{'mt-1': hasDescription}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
    <span v-if="!hasDescription" class="text-base font-medium leading-tight text-$text-title"><ContentSlot :use="$slots.title" unwrap="p" /></span>
    <div v-else class="space-y-2">
      <h3 class="text-xl font-bold text-$text-title">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h3>
      <div class="mb-2 font-light prose lg:text-lg">
        <slot name="description" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
const slots = useSlots()
const hasDescription = computed(() => !!slots.description)
</script>
