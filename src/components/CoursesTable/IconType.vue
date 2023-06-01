<template>
  <Icon v-if="isDone" name="CheckCircleIcon" :outline="true" client:only="vue" classes="w-6 h-6 text-green-500" />
  <Icon v-if="isInProgress && !isDone" name="BeakerIcon" :outline="false" client:only="vue" classes="w-6 h-6 text-gray-500" />

  <div v-if="!isInProgress && !isDone" class="self-center rounded-full border w-6 h-6 text-center">{{ index }}</div>
</template>

<script setup lang="ts">
import { courseTaken } from '@stores/courses';
import Icon from '@components/DynamicHeroIcon.vue';
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
});
</script>
