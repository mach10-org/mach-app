<template>
  <div class="space-y-20">
    <template v-if="coursesDone.length">
      <Summary :courses="coursesDone.length" :lessonsCompleted="lessonsCompleted" />
      <Progress :percentage="percentageTotalCompleted" :done="lessonsCompleted" :total="totalLessons" />
      <div class="space-y-6">
        <Detail v-for="course in coursesDone" :course="course" />
      </div>
    </template>
    <div v-else>
      <div class="p-0 mx-auto mt-10 lg:mt-13 gap-4 md:gap-12 h-full group bg-background-base flex px-6 py-8 rounded no-underline transition-colors border border-border-input">
        <div class="flex-1 flex gap-3 justify-center flex-col">
          <h2 class="text-center m-0 text-2xl leading-7 font-medium">Looks like you didn’t enroll any course yet, how about starting today ?</h2>
          <div class="text-center text-text-base m-0 leading-6">
            <OButton tag="a" href="/courses/" variant="primary">Get started today !</OButton>
          </div>
        </div>
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
