<template>
  <div class="border border-border-input rounded border-gray-200">
    <div @click="isOpen = !isOpen" :id="course.slug + '-heading'" class="group h-16 cursor-pointer flex w-full items-center px-4 bg-background-base rounded-2xl">
      <div class="w-1/4 content-center flex gap-4">
        <DynamicDevIcon :name="iconName" style="normal" class="hidden sm:flex" />
        <span class="self-center">{{ course.title }}</span>
      </div>

      <div class="grow flex items-center">
        <div class="w-full bg-gray-200 rounded-full h-2.5 group-hover:h-4 transition-height duration-200 dark:bg-gray-700">
          <div class="bg-primary h-2.5 group-hover:h-4 rounded-full transition-height duration-200" :style="{ width: percentage + '%' }"></div>
        </div>
        <span class="text-primary text-right font-bold self-center w-24 mx-8">{{ ((course.learning_lesson.length / course.quantity) * 100).toFixed(2) }}%</span>
      </div>

      <span
        class="ml-auto shrink-0 transition-all duration-200 transform"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen
        }"
      >
        <Icon name="ChevronDownIcon" :outline="false" classes="w-6 h-6" />
      </span>
    </div>
    <div v-show="isOpen" :id="'#' + course.slug + '-body'" :aria-labelledby="course.slug + '-heading'" class="bg-background-base">
      <div class="grid max-w-3xl gap-12 md:grid-cols-2 mx-auto p-0 py-8">
        <div class="mx-4 link h-full group bg-background-base flex px-6 py-8 rounded no-underline transition-colors shadow-xl border-border-input lg:mx-0">
          <div class="flex-1 flex gap-3 justify-center flex-col">
            <Icon name="ChartBarIcon" :outline="false" classes="w-10 h-10 m-auto" />
            <h4 class="text-center text-2xl leading-7 font-medium">Last 14 days</h4>
            <p class="text-center text-text-base m-0 leading-6">{{ qtyLastWeeks }} / {{ course.quantity }} ({{ ((qtyLastWeeks / course.quantity) * 100).toFixed(2) }}%) exercises completed</p>
          </div>
        </div>
        <div class="mx-4 link h-full group bg-background-base flex px-6 py-8 rounded no-underline transition-colors shadow-xl border-border-input lg:mx-0">
          <div class="flex-1 flex gap-3 justify-center flex-col">
            <Icon name="ArrowLeftOnRectangleIcon" :outline="false" classes="w-10 h-10 m-auto" />
            <h4 class="text-center text-2xl leading-7 font-medium">{{ moment(course.created_at).format('LL') }}</h4>
            <h5 class="text-center text-text-base m-0 leading-6">
              When you started the <strong>"{{ course.title }}"</strong> course
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DynamicDevIcon from '@components/DynamicDevIcon/index.vue';
import moment from 'moment';
import Icon from '@components/DynamicHeroIcon.vue';
import { Learning } from '@stores/courses';
import { computed, ref } from 'vue';

const props = defineProps({
  course: {
    type: Object as () => Learning,
    required: true
  }
});

const periodStart = moment().subtract(2, 'weeks').startOf('day');

const qtyLastWeeks = computed(() => {
  const lessons = props.course.learning_lesson.filter((l) => moment(l.updated_at).isSameOrAfter(periodStart));
  return lessons.length;
});

const percentage = computed(() => (props.course.learning_lesson.length / props.course.quantity) * 100);
const iconName = computed(() => {
  let name = 'dev';
  switch (props.course.slug) {
    case 'golang-book':
      name = 'go';
      break;
    case 'dotnet':
      name = 'go';
      break;
    default:
      name = 'dev';
      break;
  }
  return name;
});

const isOpen = ref(false);
</script>
