<template>
  <div v-if="courseStore?.length && done" class="flex items-center justify-center rounded-full border border-border-input w-6 h-6">
    <Icon name="CheckIcon" :outline="false" classes="w-4 h-4 text-green-500" />
  </div>
  <Icon v-if="isInProgress && !done" name="BeakerIcon" :outline="false" classes="w-6 h-6 text-text-muted" />
  <div v-if="!isInProgress && !done" class="flex items-center justify-center rounded-full border border-border-input w-6 h-6">{{ index }}</div>
</template>

<script setup lang="ts">
import { courseTaken } from '@stores/courses';
import Icon from '@components/DynamicHeroIcon.vue';
import { useStore } from '@nanostores/vue';
const courseStore = useStore(courseTaken);

defineProps({
  isInProgress: Boolean,
  index: Number,
  slug: String,
  done: Boolean
});
</script>
