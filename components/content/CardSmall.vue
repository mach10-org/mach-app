<template>
  <div class="text-center">
    <Icon v-if="icon" :name="icon" class="mx-auto mb-4 h-12 w-12 text-$secondary" />
    <h3 class="mb-2 font-bold text-$secondary" :class="{ 'text-4xl': isLargeText, 'text-xl': !isLargeText }">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h3>
    <div class="mb-4 max-w-none prose" :class="{ 'text-lg': isLargeText, 'text-base': !isLargeText }">
      <slot />
    </div>
    <LinkArrow v-if="link && linkText" :to="link" classes="font-medium text-sm">
      {{ linkText }}
    </LinkArrow>
  </div>
</template>

<script setup lang="ts">
interface Props {
  link?: string;
  linkText?: string;
  icon?: string;
  isLargeText?: boolean;
}

defineProps<Props>()
</script>
