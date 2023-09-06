<template>
  <div class="flex items-center justify-center overflow-hidden rounded-full bg-$background-base -my-6">
    <svg class="h-24 w-24 translate-x-1.5 translate-y-1.5 transform" x-cloak aria-hidden="true">
      <circle
        class="text-$border-input"
        stroke-width="10"
        stroke="currentColor"
        fill="transparent"
        :r="radius"
        :cx="circle"
        :cy="circle"
      />
      <circle
        class="text-$primary"
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
    <span class="text-md absolute text-$text-base">{{ percentage }}% </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  percentage: {
    type: Number,
    required: true,
  },
})

const circle = 42
const radius = 36
const circumference = radius * 2 * Math.PI
</script>
