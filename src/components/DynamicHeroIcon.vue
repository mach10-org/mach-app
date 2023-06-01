<template>
  <component :is="icon" :class="classes" />
</template>

<script setup lang="ts">
import * as solid from '@heroicons/vue/24/solid';
import * as outline from '@heroicons/vue/24/outline';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  outline: Boolean,
  classes: String,
})

const icons = computed(() => ({ solid, outline }))

const icon = computed(() => icons.value[props.outline ? 'outline' : 'solid'][props.name])
</script>
