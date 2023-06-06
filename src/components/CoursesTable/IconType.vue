<template>
  <div v-if="courseStore?.length && isDone" class="flex items-center justify-center rounded-full border border-border-input w-6 h-6">
    <Icon name="CheckIcon" :outline="false" classes="w-4 h-4 text-green-500" />
  </div>
  <Icon v-if="isInProgress && !isDone" name="BeakerIcon" :outline="false" classes="w-6 h-6 text-text-muted" />
  <div v-if="!isInProgress && !isDone" class="flex items-center justify-center rounded-full border border-border-input w-6 h-6">{{ index }}</div>
</template>

<script setup lang="ts">
import { courseTaken } from '@stores/courses';
import Icon from '@components/DynamicHeroIcon.vue';
import { onMounted, onUpdated, ref } from 'vue';
import { useStore } from '@nanostores/vue';
const courseStore = useStore(courseTaken);

const props = defineProps({
  isInProgress: Boolean,
  index: Number,
  slug: String
});
const isDone = ref(false);

const courseTakenList = courseStore.value;
onMounted(() => {
  const found = courseTakenList.find((c) => `${c?.courseId}/${c?.lessonId}` === props.slug);
  isDone.value = !!found;
});

onUpdated(() => {
  const newList = courseTaken.get();
  const found = newList.find((c) => `${c?.courseId}/${c?.lessonId}` === props.slug);
  isDone.value = !!found;
});
</script>
