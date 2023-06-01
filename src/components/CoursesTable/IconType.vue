<template>
  <CheckCircleIcon v-if="isDone" class="w-6 h-6 text-green-500" />

  <BeakerIcon v-if="isInProgress && !isDone" class="w-6 h-6 text-gray-500" />

  <div v-if="!isInProgress && !isDone" class="self-center rounded-full border w-6 h-6 text-center">{{ index }}</div>
</template>

<script setup lang="ts">
import { courseTaken } from '@stores/courses';
import { BeakerIcon } from '@heroicons/vue/24/solid';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
const props = defineProps({
  isInProgress: Boolean,
  index: Number,
  slug: String
});
const isDone = ref(false);

const courseTakenList = courseTaken.get();
onMounted(async () => {
  const found = courseTakenList.find((c) => `${c?.courseId}/${c?.lessonId}` === props.slug);
  isDone.value = !!found;
  if (found) {
    console.log('isDone', `${props.slug}`, isDone.value); // 0
  }
});
</script>
