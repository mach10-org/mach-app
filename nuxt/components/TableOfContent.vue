<template>
  <div id="toc">
    <nav class="">
      <h2 class="mb-4 font-medium tracking-widest uppercase">
        Table of content
      </h2>
      <n-anchor
        :bound="115"
        :ignore-gap="true"
      >
        <n-anchor-link
          v-for="{ id, text } in tocLinks"
          :key="id"
          :title="text"
          :href="`#${id}`"
        />
      </n-anchor>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tocLinks: {
    type: Array as () => any[],
    required: true,
  },
})
</script>
