<template>
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
</template>

<script setup lang="ts">
defineProps({
  percentage: {
    type: Number,
    required: true
  }
});

const circle = 42;
const radius = 36;
const circumference = radius * 2 * Math.PI;
const svgSizeClass = 'w-24 h-24 transform translate-x-1.5 translate-y-1.5';
</script>
