<template>
  <div class="" v-if="percentage">
    <div class="flex items-center flex-wrap px-4 lg:px-6 bg-background-base rounded-2xl" :class="widthHeight">
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

        <div data-dial-init class="relative group ml-3">
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
            class="absolute top-full right-0 flex flex-col justify-end hidden mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-700"
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
import { courseTaken, getCourseTaken, resetCourse } from '@stores/courses';
import { allTasks, onAction, onSet } from 'nanostores';
import Icon from '@components/DynamicHeroIcon.vue';
import { onMounted, ref } from 'vue';
import { Learning } from '@stores/index';
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
const coursesDoneLength = ref(0);
const percentage = ref<number | null>(null);
// const circle = 60;
// const radius = 50;
// const circumference = 50 * 2 * Math.PI;
// const svgSizeClass = 'w-32 h-32 transform translate-x-1 translate-y-1';
// const widthHeight = 'h-20';

// console.log([
//   { courseId: 'golang-book', lessonId: '01-basics-02-variables' },
//   { courseId: 'golang-book', lessonId: '01-basics-03-if-and-else' },
//   { courseId: 'golang-book', lessonId: '01-basics-04-conversions' },
//   { courseId: 'golang-book', lessonId: '01-basics-05-loops' },
//   { courseId: 'golang-book', lessonId: '01-basics-01-hello' },
//   { courseId: '00-001-mindset', lessonId: '006-resting' },
//   { courseId: '00-001-mindset', lessonId: '001-beliefs' }
// ]);
// await allTasks();
// const courseTakenRes = courseTaken.get();
// console.log('courseTaken', courseTakenRes);

const circle = 42;
const radius = 36;
const circumference = radius * 2 * Math.PI;
const svgSizeClass = 'w-24 h-24 transform translate-x-1.5 translate-y-1.5'; /**/
const widthHeight = 'h-16';

const setPercentage = (coursesDoneLength: number) => {
  percentage.value = Math.ceil((coursesDoneLength / props.courseSize) * 100);
};

// onMounted(() => {
let courseTakenList: Learning[] = [];
onSet(courseTaken, ({ newValue, abort }) => {
  // console.log('onSet', newValue);

  courseTakenList = newValue;

  const courseFound = courseTakenList.find((c) => c.slug === props.course);

  coursesDoneLength.value = courseFound?.learning_lesson?.length || 0;
  const found = courseFound?.learning_lesson.find((c) => c.slug === props.slug);

  isDone.value = !!found;
  setPercentage(coursesDoneLength.value);
});
// });

const onResetCourse = () => {
  console.log('TODO: onResetCourse');
  //TODO:
  // const res = resetCourse({ slug: props.slug, course: props.course });
  // isDone.value = false;
  // coursesDoneLength.value = res.length;
  // setPercentage(coursesDoneLength.value);
};
</script>
