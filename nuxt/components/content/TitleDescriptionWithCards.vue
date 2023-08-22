<template>
  <TitleDescription :is-centered="true">
    <template #title>
      <slot name="title" />
    </template>
    <template #description>
      <slot name="description" />
    </template>

    <div class="mt-8 md:grid lg:grid-cols-3 md:grid-cols-2 lg:mt-12 md:gap-12 space-y-8 md:space-y-0">
      <slot />
    </div>
  </TitleDescription>
</template>
