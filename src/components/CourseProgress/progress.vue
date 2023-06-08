<template>
  <div class="" v-if="percentage">
    <div class="flex items-center flex-wrap px-4 lg:px-8 bg-background-base rounded-2xl" :class="widthHeight">
      <a :href="href" class="inline-flex items-center text-sm font-medium link mr-6 lg:mr-8"> &larr; {{ title }} </a>
      <div class="flex items-center justify-center -my-6 overflow-hidden bg-background-base rounded-full">
        <svg class="" :class="svgSizeClass" x-cloak aria-hidden="true">
          <circle class="text-border-input" stroke-width="10" stroke="currentColor" fill="transparent" :r="radius" :cx="circle" :cy="circle" />
          <circle
            class="text-primary"
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
        <span class="absolute text-md text-text-base">{{ percentage }}% </span>
      </div>
      <p class="hidden ml-3 font-medium text-text-base md:text-lg lg:block">Completion</p>

      <div class="flex whitespace-nowrap ml-auto items-center relative" v-if="isDone">
        <Icon name="CheckCircleIcon" :outline="true" classes="w-6 h-6 text-green-500 mr-1" />
        <span class="font-medium text-text-base hidden lg:block">Chapter finished</span>

        <div data-dial-init class="reset-course relative group ml-3 py-2">
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-dropdown"
            aria-controls="speed-dial-menu-dropdown"
            aria-expanded="false"
            class="flex items-center justify-center ml-auto text-text-muted w-10 h-10 hover:bg-primary hover:text-white rounded"
          >
            <Icon name="EllipsisVerticalIcon" :outline="true" classes="w-6 h-6 " />
            <span class="sr-only">Open actions menu</span>
          </button>
          <div
            id="speed-dial-menu-dropdown"
            class="absolute hidden top-full right-0 flex flex-col justify-end mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-700"
          >
            <ul class="text-sm text-gray-500 dark:text-gray-300">
              <li>
                <a @click="onResetCourse" class="cursor-pointer flex items-center px-5 py-2 hover:text-blue-400">
                  <span class="text-sm font-medium">Mark as not finished</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { courseTaken, resetCourse } from '@stores/courses';
import { onSet } from 'nanostores';
import Icon from '@components/DynamicHeroIcon.vue';
import { ref } from 'vue';
import { Learning, getUser } from '@stores/index';
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
  },
  title: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  }
});
const isDone = ref(false);
const courseId = ref<string>();
const coursesDoneLength = ref(0);
const percentage = ref<number | null>(null);

const circle = 42;
const radius = 36;
const circumference = radius * 2 * Math.PI;
const svgSizeClass = 'w-24 h-24 transform translate-x-1.5 translate-y-1.5';
const widthHeight = 'h-16';

const setPercentage = (coursesDoneLength: number) => {
  percentage.value = Math.ceil((coursesDoneLength / props.courseSize) * 100);
};

let courseTakenList: Learning[] = [];
onSet(courseTaken, ({ newValue, abort }) => {
  courseTakenList = newValue;
  const courseFound = courseTakenList.find((c) => c.slug === props.course);
  coursesDoneLength.value = courseFound?.learning_lesson?.length || 0;
  const found = courseFound?.learning_lesson.find((c) => c.slug === props.slug);

  courseId.value = found?.id;
  isDone.value = !!found;
  setPercentage(coursesDoneLength.value);
});

const onResetCourse = async () => {
  const user = await getUser();
  if (user && courseId.value) {
    const { slug, course } = props;
    resetCourse(user.id, { slug, course, courseId: courseId.value });
    isDone.value = false;
    coursesDoneLength.value = coursesDoneLength.value - 1;
    setPercentage(coursesDoneLength.value);
  }
};
</script>

<style is:inline>
.reset-course:hover #speed-dial-menu-dropdown {
  display: block !important;
}
</style>
