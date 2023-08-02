<template>
  <div>
    <h2 class="mb-6 text-sm font-semibold uppercase">
      {{ $t(`footer.menu_title_${menuIndex}`) }}
    </h2>
    <ul class="text-text-muted">
      <li v-for="(_m, index) in menu" :key="index" class="mb-4">
        <a v-if="$t(`footer.menu_${menuIndex}.${index}.external`) === 'true'" :href="$t(`footer.menu_${menuIndex}.${index}.link`)" target="_blank">{{ $t(`footer.menu_${menuIndex}.${index}.label`) }}</a>
        <NuxtLink v-else :to="`/${$t(`footer.menu_${menuIndex}.${index}.link`)}`">
          {{ $t(`footer.menu_${menuIndex}.${index}.label`) }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  menu: {
    type: Array,
    required: true,
  },
  menuIndex: {
    type: String,
    required: true,
  },
})
</script>
