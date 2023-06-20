<template>
  <div class="slide-content flex h-full flex-col justify-center" :class="wrapperClass">
    <div class="mx-auto px-2" :class="innerClass">
      <div class="field-wrapper" :class="contentClass">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  wrapperClass: String,
  innerClass: String,
  contentClass: String
});
</script>
