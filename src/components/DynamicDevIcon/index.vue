<template>
  <div v-if="icon" class="h-12 w-12 inline-flex self-center" :alt="name">
    <component :is="icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as icons from './icons/assets';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  }
});

const icon = computed(() => icons[props.name]);
</script>
