<template>
  <div class="py-6 flex flex-col justify-center items-center">
    <h2 class="text-center mb-1 text-xl lg:text-2xl font-medium" v-html="localJourney.progress_percentTitle(percentage)"></h2>
    <p class="text-center text-text-muted m-0 leading-6">{{ done }} / {{ total }} {{ localJourney.progress_percentSubtile }}</p>
  </div>
</template>
<script setup lang="ts">
import { locales } from '@constants/localize';
const {
  pages: { journey: localJourney }
} = locales;

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
<style lang="postcss">
.percent {
  @apply text-text-title font-extrabold border-b-2 border-border-input;
}
</style>
