<template>
  <div class="py-10 bg-gray-100" v-if="percentage">
    <div class="flex items-center flex-wrap px-10 bg-white shadow-xl rounded-2xl h-20">
      <div class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
        <svg class="w-32 h-32 w-20 h-20 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
          <circle class="text-gray-300" stroke-width="10" stroke="currentColor" fill="transparent" :r="radius" :cx="circle" :cy="circle" />
          <circle
            class="text-blue-600"
            stroke-width="10"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circumference - (percentage / 100) * circumference"
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            :r="radius"
            :cx="circle"
            :cy="circle"
          />
        </svg>
        <span class="absolute text-md text-blue-700">{{ percentage }}% </span>
      </div>
      <p class="ml-10 font-medium text-gray-600 md:text-xl">Completion</p>

      <div class="flex gap-x-3 whitespace-nowrap ml-auto" v-if="isDone">
        <Icon name="CheckCircleIcon" :outline="true" client:only="vue" classes="w-6 h-6 text-green-500" />
        <span class="font-medium text-gray-600 hidden sm:block md:text-xl">Chapter finished</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { courseTaken } from '@stores/courses';
import Icon from '@components/DynamicHeroIcon.vue';
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
  course: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  courseSize: {
    type: Number,
    required: true
  }
});
const isDone = ref(false);
const courseTakenList = courseTaken.get();
const circumference = 50 * 2 * Math.PI;
const circle = 60;
const radius = 50;

const percentage = computed(() => {
  const coursesDoneLength = courseTakenList.filter((c) => c.courseId === props.course).length;
  return Math.ceil((coursesDoneLength / props.courseSize) * 100);
});
onMounted(async () => {
  const found = courseTakenList.find((c) => c.lessonId === props.slug && c.courseId === props.course);
  isDone.value = !!found;
});
</script>
