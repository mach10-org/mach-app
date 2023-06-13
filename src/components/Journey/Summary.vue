<template>
  <ul class="p-0 max-w-3xl mx-auto mt-14 grid md:grid-cols-2">
    <li
      class="flex flex-col justify-center items-center py-4 border-b md:border-r md:border-b-0 border-border-input"
    >
      <h2 class="text-text-title text-2xl lg:text-3xl mb-1 font-extrabold">
        {{ courses }}
      </h2>
      <p class="text-text-muted">Courses enrolled</p>
    </li>
    <li
      class="flex flex-col justify-center items-center py-4"
    >
      <h2 class="text-text-title text-2xl lg:text-3xl mb-1 font-extrabold">
        {{ lessonsCompleted }}
      </h2>
      <p class="text-text-muted">Lessons completed</p>
    </li>
  </ul>
</template>
<script setup lang="ts">
defineProps({
  courses: {
    type: Number,
    required: true,
  },
  lessonsCompleted: {
    type: Number,
    required: true,
  },
});
</script>
