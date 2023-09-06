<template>
  <component :is="sectionTag" class="mx-auto py-8 container">
    <component
      :is="titleTag"
      class="mb-4 tracking-tight text-$text-title"
      :class="{
        'text-center': isCentered,
        'text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl': isH1,
        'text-4xl font-bold': !isH1,
      }"
    >
      <ContentSlot :use="$slots.title" unwrap="p" />
    </component>
    <div
      class="max-w-screen-lg prose lg:text-lg"
      :class="{ 'text-center': isCentered, 'mx-auto': isCentered }"
    >
      <slot name="description" />
    </div>
    <LinkArrow v-if="link && linkText" :to="link" class="mt-6 text-lg font-medium">
      {{ linkText }}
    </LinkArrow>
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  link?: string;
  linkText?: string;
  isCentered?: boolean;
  classes?: string;
  isH1?: boolean;
}
const props = defineProps<Props>()

const sectionTag = computed(() => props.isH1 ? 'div' : 'section')
const titleTag = computed(() => props.isH1 ? 'h1' : 'h2')
</script>
