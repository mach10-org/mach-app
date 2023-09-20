<template>
  <section>
    <div class="mx-auto items-center gap-8 py-8 container lg:grid lg:grid-cols-2 xl:gap-16">
      <nuxt-img v-if="imagePosition === 'left'" :src="imageSrc" :alt="imageAlt" :sizes="sizes" class="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex dark:opacity-70" />
      <div>
        <h2 class="mb-4 text-4xl font-bold tracking-tight text-$text-title">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h2>
        <div class="max-w-none prose lg:text-lg">
          <slot name="description" />
        </div>
        <div v-if="addSeparator" class="mt-7 border-t border-$border-input" />
        <slot />
      </div>
      <nuxt-img v-if="imagePosition === 'right' && !has2Images" :src="imageSrc" :alt="imageAlt" :sizes="sizes" class="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex dark:opacity-70" />
      <div v-else-if="imagePosition === 'right' && has2Images" class="grid grid-cols-2 mt-8 gap-4">
        <nuxt-img class="w-full rounded-lg dark:opacity-70" :src="imageSrc" :alt="imageAlt" :sizes="sizes2Images" />
        <nuxt-img class="mt-4 w-full rounded-lg lg:mt-10 dark:opacity-70" :src="imageSrc2" :alt="imageAlt2" :sizes="sizes2Images" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  imageSrc: any;
  imageAlt: string;
  imageSrc2?: any;
  imageAlt2?: string;
  imagePosition: 'left' | 'right';
  addSeparator?: boolean;
}

const props = defineProps<Props>()

const has2Images = computed(() => props.imageSrc2 !== undefined)
const sizes = 'lg:464px xl:576px'
const sizes2Images = 'lg:224px xl:280px'
</script>
