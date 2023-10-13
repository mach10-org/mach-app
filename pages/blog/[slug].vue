<template>
  <BlogPage :page="route.params.slug.toString()" />
</template>

<script setup lang="ts">
const route = useRoute()
</script>
