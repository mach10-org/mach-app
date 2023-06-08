<template>
  <div class="border border-border-input rounded border-gray-200">
    <h2 :id="course.slug + '-heading'">
      <button
        type="button"
        @click="toggleAccordion()"
        class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        data-accordion-target="#accordion-collapse-body-1"
        :aria-expanded="isOpen"
        :aria-controls="'#' + course.slug + '-body'"
      >
        <span>{{ course.title }}</span> <span class="text-link">{{ ((course.learning_lesson.length / course.quantity) * 100).toFixed(2) }}%</span>
        <svg
          data-accordion-icon
          class="w-6 h-6 shrink-0 transition-all duration-200 transform"
          :class="{
            'rotate-180': isOpen,
            'rotate-0': !isOpen
          }"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </h2>

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
import { Learning } from '@stores/courses';
import { ref } from 'vue';
const props = defineProps({
  course: {
    type: Object as () => Learning,
    required: true
  }
});

const isOpen = ref(false);
function toggleAccordion() {
  this.isOpen = !this.isOpen;
}
</script>
