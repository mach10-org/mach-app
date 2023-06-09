<template>
  <div class="border border-border-input rounded border-gray-200">
    <button @click="toggleAccordion()" :id="course.slug + '-heading'" class="h-16 flex w-full items-center flex-wrap px-4 lg:px-8 bg-background-base rounded-2xl">
      <Swift /><span>{{ course.title }}</span>

      <ProgressCircle :percentage="Math.round(percentage)" />
      <span
        class="shrink-0 transition-all duration-200 transform"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen
        }"
      >
        <Icon name="ChevronDownIcon" :outline="false" classes="w-6 h-6 " />
        <!-- <svg
          data-accordion-icon
          class="w-6 h-6 shrink-0 transition-all duration-200 transform"
          
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg> -->
      </span>
    </button>
    <div v-show="isOpen" :id="'#' + course.slug + '-body'" :aria-labelledby="course.slug + '-heading'" class="p-0 mx-auto lg:mt-13 gap-4 md:gap-12">
      <div class="h-full group bg-background-base flex px-6 py-8 rounded transition-colors">
        <div class="flex-1 flex gap-3 justify-center flex-col">
          <p class="text-center text-text-base m-0 leading-6">{{ course.learning_lesson.length }} / {{ course.quantity }}</p>
          <p class="text-center text-text-base m-0 leading-6">{{ course.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Swift from 'programming-languages-logos/src/swift/swift.svg';

import ProgressCircle from '@components/CourseProgress/ProgressCircle.vue';
import Icon from '@components/DynamicHeroIcon.vue';
import { Learning } from '@stores/courses';
import { computed, ref } from 'vue';
const props = defineProps({
  course: {
    type: Object as () => Learning,
    required: true
  }
});
const percentage = computed(() => (props.course.learning_lesson.length / props.course.quantity) * 100);

const isOpen = ref(false);
function toggleAccordion() {
  this.isOpen = !this.isOpen;
}
</script>
