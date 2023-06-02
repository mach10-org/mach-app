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

      <div class="flex gap-x-3 whitespace-nowrap ml-auto items-center relative" v-if="isDone">
        <Icon name="CheckCircleIcon" :outline="true" classes="w-6 h-6 text-green-500" />
        <span class="font-medium text-gray-600 hidden sm:block md:text-xl">Chapter finished</span>
        <!-- <OButton size="small" inverted><Icon name="EllipsisVerticalIcon" :outline="true" classes="w-6 h-6 text-grey-300" /></OButton> -->

        <div data-dial-init class="relative group">
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-dropdown"
            aria-controls="speed-dial-menu-dropdown"
            aria-expanded="false"
            class="flex items-center justify-center ml-auto text-grey-300 rounded-full w-10 h-10 hover:bg-blue-400 hover:text-white"
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
import { courseTaken, resetCourse } from '@stores/courses';
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
const coursesDoneLength = ref(0);
const percentage = ref<number | null>(null);
const courseTakenList = courseTaken.get();
const circumference = 50 * 2 * Math.PI;
const circle = 60;
const radius = 50;

const setPercentage = (coursesDoneLength: number) => {
  percentage.value = Math.ceil((coursesDoneLength / props.courseSize) * 100);
};

onMounted(() => {
  coursesDoneLength.value = courseTakenList.filter((c) => c.courseId === props.course).length;
  const found = courseTakenList.find((c) => c.lessonId === props.slug && c.courseId === props.course);
  isDone.value = !!found;
  setPercentage(coursesDoneLength.value);
});

const onResetCourse = () => {
  const res = resetCourse({ slug: props.slug, course: props.course });
  isDone.value = false;
  coursesDoneLength.value = res.length;
  setPercentage(coursesDoneLength.value);
};
</script>
