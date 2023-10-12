<template>
  <NuxtLayout
    name="intro"
    :has-header="true"
    :title="title"
    :description="description"
    :preview="preview"
    :show-toc="showToc"
    :toc-links="tocLinks"
  >
    <!-- TODO add link back to blog list, date and tags -->
    <slot />
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  preview: {
    type: String,
    default: undefined,
  },
  showToc: {
    type: Boolean,
    default: true,
  },
  tocLinks: {
    type: Array,
    required: true,
  },
})
</script>
