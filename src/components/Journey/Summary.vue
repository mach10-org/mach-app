<template>
  <ul class="p-0 max-w-3xl mx-auto grid mt-10 lg:mt-13 gap-4 md:grid-cols-2 md:gap-12">
    <li>
      <div class="link h-full group bg-background-base flex px-6 py-8 rounded no-underline transition-colors border border-border-input">
        <div class="flex-1 flex gap-3 justify-center flex-col">
          <h2 class="text-center m-0 text-2xl lg:text-3xl text-link leading-6 lg:leading-7 mt-1 font-extrabold">{{ courses }}</h2>
          <p class="text-center text-text-base m-0 leading-6">Courses enrolled</p>
        </div>
      </div>
    </li>
    <li>
      <div class="link h-full group bg-background-base flex px-6 py-8 rounded no-underline transition-colors border border-border-input">
        <div class="flex-1 flex gap-3 justify-center flex-col">
          <h2 class="text-center m-0 text-2xl lg:text-3xl text-link leading-6 lg:leading-7 mt-1 font-extrabold">{{ lessonsCompleted }}</h2>
          <p class="text-center text-text-base m-0 leading-6">Lessons completed</p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
defineProps({
  courses: {
    type: Number,
    required: true
  },
  lessonsCompleted: {
    type: Number,
    required: true
  }
});
</script>
