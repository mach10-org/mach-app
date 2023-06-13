<template>
  <div class="space-y-12">
    <template v-if="coursesDone.length > 0">
      <Summary :courses="coursesDone.length" :lessonsCompleted="lessonsCompleted" />
      <Progress :percentage="percentageTotalCompleted" :done="lessonsCompleted" :total="totalLessons" />
      <div class="space-y-6">
        <Detail v-for="course in coursesDone" :course="course" />
      </div>
    </template>
    <div v-else class="flex justify-center flex-col mt-24">
      <p class="text-center text-xl lg:text-2xl font-medium mb-4">Looks like you didn’t enroll any course yet, how about starting today ?</p>
      <div class="text-center text-text-base m-0 leading-6">
        <OButton tag="a" href="/courses/" variant="primary">Get started today !</OButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Summary from './Summary.vue';
import { OButton } from '@oruga-ui/oruga-next';
import Progress from './Progress.vue';
import Detail from './Detail.vue';
import { courseTaken } from '@stores/courses';
import { allTasks } from 'nanostores';
import { computed } from 'vue';

await allTasks();
const coursesDone = courseTaken.get();

const totalLessons = computed(() =>
  coursesDone.reduce((acc, course) => {
    return acc + course.quantity;
  }, 0)
);
const lessonsCompleted = computed(() =>
  coursesDone.reduce((acc, course) => {
    return acc + course.learning_lesson.length;
  }, 0)
);

const percentageTotalCompleted = computed(() => ((lessonsCompleted.value / totalLessons.value) * 100).toFixed(2));
</script>
