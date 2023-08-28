<template>
  <div class="">
    <div v-if="hasHeader || hasHeaderBar" class="mx-auto max-w-[46.8rem] lg:max-w-[50.9rem]">
      <div v-if="hasHeader" class="flex flex-col justify-between px-4 pb-3 pt-10 lg:flex-row lg:items-center lg:px-8">
        <slot name="header" />
      </div>
      <slot name="header-bar" />
    </div>

    <main class="mx-auto rounded bg-$background-base p-4 text-lg prose lg:(p-8 text-xl)">
      <slot />
    </main>

    <slot name="toc" />
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const hasHeader = computed(() => !!slots.header)
const hasHeaderBar = computed(() => !!slots['header-bar'])
const hasToc = computed(() => !!slots.toc) // TODO
</script>
