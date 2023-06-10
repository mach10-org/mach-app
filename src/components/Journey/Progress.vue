<template>
  <div class="p-0 mx-auto mt-10 lg:mt-13 gap-4 md:gap-12">
    <div class="h-full group bg-background-base flex px-6 py-8 rounded no-underline transition-colors border border-border-input">
      <div class="flex-1 flex gap-3 justify-center flex-col">
        <h2 class="text-center m-0 text-2xl leading-7 mt-1 font-medium">
          You're <span class="text-link">{{ percentage }}%</span> through your enrolled Courses.
        </h2>
        <p class="text-center text-text-base m-0 leading-6">{{ done }} / {{ total }} lessons completed</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  percentage: {
    type: String,
    required: true
  },
  done: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});
</script>
