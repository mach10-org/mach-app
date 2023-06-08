<template>
  <div class="space-y-20">
    <Summary :courses="coursesDone.length" :lessonsCompleted="lessonsCompleted" />
    <Progress :percentage="percentageTotalCompleted" :done="lessonsCompleted" :total="totalLessons" />

    <div v-if="coursesDone.length" class="space-y-6">
      <Detail v-for="course in coursesDone" :course="course" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Summary from './Summary.vue';
import Progress from './Progress.vue';
import Detail from './Detail.vue';
import { courseTaken } from '@stores/courses';
import { allTasks } from 'nanostores';
import { computed, onMounted } from 'vue';
await allTasks();
const coursesDone = courseTaken.get();
// const coursesId = coursesDone.map((c) => c.slug);
// const allCoursesEnrolled = await getAllLessonsPerCourse('courses', coursesId);
console.log('coursesDone', coursesDone);

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
