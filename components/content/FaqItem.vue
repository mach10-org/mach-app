<template>
  <n-collapse-item :title="title" :name="title" class="faq-item">
    <slot />
  </n-collapse-item>
</template>

<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>

<style lang="postcss">
.n-collapse .faq-item.n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner {
  @apply pt-0;
}
</style>
