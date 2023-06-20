<template>
  <div v-if="show" class="bg-gray-900 bg-opacity-75 dark:bg-opacity-80 fixed inset-0 z-40 flex items-center justify-center">
    <Spinner />
  </div>
</template>
<script lang="ts" setup>
import Spinner from '@components/svg/Spinner.vue';

defineProps({
  show: Boolean
});
</script>
