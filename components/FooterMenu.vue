<template>
  <div>
    <h2 class="mb-6 text-sm font-semibold uppercase">
      {{ title }}
    </h2>
    <ul class="text-$text-muted">
      <li v-for="(m, index) in menu" :key="index" class="mb-4">
        <a v-if="m.path.startsWith('http')" :href="m.path" target="_blank" class="hover:underline">{{ m.label }}</a>
        <NuxtLink v-else :to="localePath(m.path)" class="hover:underline">
          {{ m.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  menu: {
    type: Array as () => Array<{
    label: string
    path: string
  }>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const localePath = useLocalePath()
</script>
