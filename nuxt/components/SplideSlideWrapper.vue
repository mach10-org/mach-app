<template>
  <div class="slide-content h-full flex flex-col justify-center" :class="wrapperClass">
    <div class="mx-auto px-2" :class="innerClass">
      <div class="items-center gap-7" :class="contentClass">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  wrapperClass?: string,
  innerClass?: string,
  contentClass?: string
}

defineProps<Props>()
</script>
