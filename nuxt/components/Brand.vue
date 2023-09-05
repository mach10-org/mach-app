<template>
  <nuxt-link to="/" class="flex items-center transition-opacity lg:mr-8 hover:opacity-80">
    <span class="mr-3 text-2xl sm:text-3xl">👩🏻‍🚀</span>
    <span class="self-center whitespace-nowrap font-semibold text-$text-base" :class="{ 'text-lg': size === 'sm' , 'text-xl': size === 'md' , 'text-2xl': size === 'lg' }">
      {{ $config.public.siteName }}
    </span>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
})
</script>
