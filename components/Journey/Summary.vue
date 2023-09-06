<template>
  <ul class="grid mx-auto mt-14 max-w-3xl p-0 md:grid-cols-2">
    <li class="flex flex-col items-center justify-center border-b border-$border-input py-4 md:border-b-0 md:border-r">
      <h2 class="mb-1 text-2xl font-extrabold text-$text-title lg:text-3xl">
        {{ courses }}
      </h2>
      <p class="text-base text-$text-muted">
        {{ $t('pages.journey.summary_left') }}
      </p>
    </li>
    <li class="flex flex-col items-center justify-center py-4">
      <h2 class="mb-1 text-2xl font-extrabold text-$text-title lg:text-3xl">
        {{ lessonsCompleted }}
      </h2>
      <p class="text-base text-$text-muted">
        {{ $t('pages.journey.summary_right') }}
      </p>
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
})
</script>
