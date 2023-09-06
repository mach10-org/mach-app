<template>
  <p class="text-[1.2em]">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </p>
</template>
