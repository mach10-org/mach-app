<template>
  <nuxt-link :to="localePath(to)" class="link inline-flex items-center">
    <slot />
    <svg class="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  to: string;
}
defineProps<Props>()

const localePath = useLocalePath()
</script>
