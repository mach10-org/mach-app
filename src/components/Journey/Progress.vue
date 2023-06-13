<template>
  <div class="py-6 flex flex-col justify-center items-center">
    <h2 class="text-center mb-1 text-xl lg:text-2xl font-medium">
      You're <span class="text-text-title font-extrabold border-b-2 border-border-input">{{ percentage }}%</span> through your enrolled Courses.
    </h2>
    <p class="text-center text-text-muted m-0 leading-6">{{ done }} / {{ total }} lessons completed</p>
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
