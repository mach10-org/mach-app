<template>
  <div class="flex flex-col items-center justify-center py-6">
    <h2 class="mb-1 text-center text-xl font-medium lg:text-2xl">
      <i18n-t keypath="pages.journey.progress_percentTitle">
        <template #percentage>
          <span class="border-b-2 border-$border-input font-extrabold text-$text-title">
            {{ percentage }}%
          </span>
        </template>
      </i18n-t>
    </h2>
    <p class="m-0 text-center text-base leading-6 text-$text-muted">
      {{ done }} / {{ total }} {{ $t('pages.journey.progress_percentSubtile') }}
    </p>
  </div>
</template>
<script setup lang="ts">
import {} from 'vue-i18n'

defineProps({
  percentage: {
    type: String,
    required: true,
  },
  done: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
</script>
